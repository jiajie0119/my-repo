#pragma once

#include <iostream>
#include <sstream>
#include <cstdlib>
#include <string>
#include <thread>
#include <chrono>
#include <iomanip>
#include <vector>
#include <map>


using namespace std;

class Cinema {
    class Node {
        public:

           string name;
           string seatNumber;
           string seatType;
           double price;
           bool status = true;
           Node *Next;
           Node *Prev;
           

           Node (string sn, string t, double p, bool s) {
                seatNumber = sn;
                seatType = t;
                price = p;
                status = s;
                Next = nullptr;
                Prev = nullptr;
           }
    };

    public:

    //vector<Node*> hall;
    map<string, vector<Node*>> halls;
    
    bool status = true;
    double totalPrice = 0;
    double price = 0;
    double discount = 0;
    int numberOfTickets;
    int numberOfDiscount;
    int selectedRow;
    int selectedColumn;

    Cinema() {
        
        halls["DefaultMovie"] = vector<Node*>(22, nullptr);
    }

    string int_to_str(int x) {
       stringstream ss;
       ss << x;
       return ss.str();
    }

    void MainMenu(){
        while (true) {
            system("cls");

            string movieName[5] = {"Aquaman And The Lost Kingdom", "Top Gun: Maverick", "John Wick: Chapter 4", "Train to Busan", "Upin & Ipin"};
            cout << "===== Available Movie =====" << endl;
            for (int i = 0; i < 5; i++) {
                cout << i + 1 << " - " << movieName[i] << endl;
            }

            int choice;
            string selectedMovie;
            while (true) {
                cout << "\nEnter the number corresponding to the movie you want to book: ";
                
                if (!(cin >> choice) || choice < 1 || choice > 5) {
                    cout << "Invalid input. Please enter a number between 1 and 5." << endl;
                    cin.clear(); // Clear the error flag
                    cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Discard invalid input
                continue; // Continue to the outer loop to re-enter the movie choice
                }

                switch (choice) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    selectedMovie = movieName[choice - 1];
                    //halls[selectedMovie].resize(20, nullptr);
                    break;
                default:
                    // Handle unexpected choices if needed
                    cout << "Invalid choice. Please try again." << endl;
                    continue; // Continue to the outer loop to re-enter the movie choice
                }

                if (halls.find(selectedMovie) == halls.end()) {
                halls[selectedMovie] = vector<Node*>(22, nullptr);
            }

                // Call the corresponding hall function based on the selected movie
                Hall(selectedMovie, halls[selectedMovie], choice);
            }
        }
    }

    
    void Hall(const string& movie, vector<Node*>& hall, int HallNum) {
        system("cls");
        int count;    
        char seatRow;   
        string seat;
        char RowNum[22] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'};

        for(int i=0; i<22; i++) {
            for(int j=0; j<32; j++) {
                string seatNumber = RowNum[i] + int_to_str(j+1);
                Node* newNode = nullptr;

                if (i < 5) {
                    newNode = new Node(seatNumber, "Green", 15, true);
                } else if (i < 13) {
                    newNode = new Node(seatNumber, "Yellow", 20, true);
                } else if (i < 18) {
                    newNode = new Node(seatNumber, "Orange", 25, true);
                } else {
                    newNode = new Node(seatNumber, "Blue (Twin Seats)", 45, true);
                }

                if (hall[i] == nullptr) {
                    hall[i] = newNode;
                } else {
                    Node *ptr = hall[i];
                    while(ptr->Next != nullptr)
                        ptr = ptr->Next;
                    ptr->Next = newNode;
                }
            }
        }

        display(hall);

        
        while(true){
            cout << "Enter total number of people (Maximum 5 tickets): ";
            cin >> numberOfTickets;

            if (cin.fail() || numberOfTickets < 1 || numberOfTickets > 5) {
                cin.clear(); // Clear the error flag
                cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Discard invalid input
                cout << "Total number of people must be within the range of 1 to 5. Please enter again." << endl << endl;
            continue;
        }

            cout << "Enter number of children (below 12 years old): ";
            cin >> numberOfDiscount;

            if (cin.fail() || numberOfDiscount < 0 || numberOfDiscount >= numberOfTickets) {
                cin.clear(); // Clear the error flag
                cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Discard invalid input
                cout << "Number of children cannot exceed or equal the total number of people. Please enter again." << endl << endl;
            continue;
        }

            cout << "Choose the first seat counting from the left (E.g. A1): ";
            cin >> seat;

            
            pair<int, int> rowAndColumn = getRowAndColumn(seat);
            selectedRow = rowAndColumn.first;
            selectedColumn = rowAndColumn.second;

            if (!validateSeatInput(seat, rowAndColumn)) {
                cout << "Invalid seat. Please enter again." << endl << endl;
                continue;
            }
            
            if(selectedRow >= 19 && selectedRow <= 22){                

                if (numberOfTickets%2 != 0) {
                    cout << "Twin seats must be selected in even number of total number of people. Please enter again." << endl << endl;
                    continue;
                }

                else if (numberOfDiscount != 0) {
                    cout << "Children are not allowed to select twin seats. Please enter again." << endl << endl;
                    continue;
                }

                else if (selectedColumn % 2 == 0) {
                    cout << "Twin seats must be selected with odd seat numbers. Please enter again." << endl << endl;
                    continue;
                }
                else if (selectedColumn - 1 + numberOfTickets > 24) {
                    cout << "Not enough consecutive seats available for the total number of people. Please enter again." << endl << endl;
                    continue;
                }
                else {                                                                                                      
                    break;
                }
                    
            }
                
            else {
                if(selectedColumn + numberOfTickets > 33) {
                    cout << "Not enough consecutive seats available for the total number of people. Please enter again." << endl << endl;
                    continue;
                } 
            }          
            
            // check seat availability
            if (areSeatsBooked(hall, selectedRow, selectedColumn, numberOfTickets)) {
                cout << "Sorry, one or more selected seats are already booked. Please choose another seat." << endl << endl;
                continue;
            }

            // check seat is aisle
            if (isAisle(selectedRow - 1, selectedColumn)) {
                cout << "Sorry, this is an aisle. Please enter again." << endl << endl;
                continue;
            }

            // check consecutive seats are aisle
            bool consecutiveSeatsAreAisle = false;
            for (int i = 0; i < numberOfTickets; i++) {                
                if (isAisle(selectedRow - 1, selectedColumn + i)) {
                    cout << "/ Not enough consecutive seats available for the total number of people. Please enter again." << endl << endl;
                    consecutiveSeatsAreAisle = true;
                    break;
                }

            }
            

            if (consecutiveSeatsAreAisle) {
                continue; // Go back to ask the user to enter the first seat
            }

            break;
            
            
        }


        // Display selected seats with consecutive seats
        seatRow = seat[0];
        cout << "\nSeat selected are: " ;
        if(selectedRow == 19 || selectedRow == 20 || selectedRow == 21 || selectedRow == 22) {
            for(count = 0; count < numberOfTickets/2; count++) {
                cout << seatRow << selectedColumn + count + count << " ";
            }
        }
        else {
            for(count = 0; count < numberOfTickets; count++) {
                cout << seatRow << selectedColumn + count << " ";
            }
        }
        
        


        Node* ptr1 = hall[selectedRow-1];
        
        // Display which area the user buy
        cout << " [" << ptr1->seatType << " Area]"<< endl;

        // Calculate the price
        while (ptr1 != nullptr && selectedColumn > 0) {           

            // Apply discount if applicable
            if (numberOfDiscount > 0) {
                // Calculate discount
                totalPrice =  ((float)ptr1->price * count) - (float)ptr1->price * 0.5 * numberOfDiscount;
                discount = (float)ptr1->price * 0.5 * numberOfDiscount;
                        
            }
            else {
                totalPrice = ptr1->price * count;
                discount = 0;
            }
            
            break;         
            }
        

        // Display price
        cout << "\nPrice per ticket: RM " << setprecision(2) << ptr1->price << endl;
        cout << "Discount\t: RM " << setprecision(2) << discount;
        cout << "\nTotal Price\t: RM " << setprecision(2) << totalPrice << endl;
        
        time_t now = time(0);
        char* date_time = ctime(&now);
        

        // confirm ticket
        while(true){
            cout << "\n\nDo you confirm your ticket (Y/N)? ";
            char receipt;
            cin >> receipt;

            if(receipt == 'Y' || receipt == 'y'){
                string seatNUM = seatRow + int_to_str(selectedColumn);
                Node* selectedSeat = hall[selectedRow - 1];

                // Move to the correct column
                for (int c = 0; c < selectedColumn; c++) {
                    if (selectedSeat != nullptr && selectedSeat->Next != nullptr) {
                        selectedSeat = selectedSeat->Next;
                    } 
                    else {
                        // Handle the case where the selectedSeat is null or the Next pointer is null (out of bounds)
                        cout << "Error: Seat out of bounds. Unable to update status." << endl;
                        
                    }
                }

                if (selectedSeat != nullptr) {
                    // Update the status to FALSE of each selected seat
                    for (int i = 0; i < numberOfTickets; ++i) {
                        Node* currentSeat = hall[selectedRow - 1];
                        for (int c = 0; c < selectedColumn - 1 + i; ++c) {
                            if (currentSeat != nullptr && currentSeat->Next != nullptr) {
                                currentSeat = currentSeat->Next;
                            } 
                            else {
                                cout << "Error: Seat out of bounds. Unable to update status of the seat." << endl;
                                break;
                            }
                        }
                        if (currentSeat != nullptr) {
                            currentSeat->status = false;
                        } 
                        else {
                            cout << "Error: Seat pointer is null. Unable to update status of the seat." << endl;
                        }
                    }
                } 
                else {
                    cout << "Error: Seat pointer is null. Unable to update status." << endl;
                }

                printReceipt(date_time, movie, HallNum, count, numberOfDiscount, seatRow, selectedColumn, ptr1->seatType, ptr1->price, discount, totalPrice);
                while(true){
                    cout << "Do you want to continue buying tickets (Y/N)? ";
                    char continueBuying;
                    cin >> continueBuying;

                    if (continueBuying == 'Y' || continueBuying == 'y') {
                        MainMenu();
                    }
                    else if(continueBuying == 'N' || continueBuying == 'n'){
                        cout << "Thank you for using the ticketing system!\n";
                        exit(EXIT_SUCCESS);
                    }
                    else
                        cout << "Invalid input. Please enter Y or N.\n";
                }
               
            }
            else if (receipt == 'N' || receipt == 'n'){
                cout << "Going back to main menu...\n";
                // Wait for 3 seconds
                this_thread::sleep_for(chrono::seconds(2));
                MainMenu();
            }
            else{
                cout << "Invalid input. Please enter Y or N.\n";
            }
        }
    }

    void display(const vector<Node*>& hall) {
       
        system("cls");
        Node* current;
        cout << "\t======================================================================================================================================================" << endl;
        cout << "\t\t\t\t\t\t\t\t\t\tSCREEN" << endl << endl << endl;
        char RowNum[22] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'};

        

        for (int i = 0; i < 22; i++) {
            
            cout << RowNum[i] << "|\t";

            for (int j = 1; j <= 32; j++) {
                current = hall[i];

                if (isAisle(i, j)) {
                    cout << "    ";
                    continue;
                }

                while (current != nullptr) {
                    if (stoi(current->seatNumber.substr(1)) == j) {

                        // twin seats
                        if (i == 18 || i == 19 || i == 20 || i == 21) {
                            // Display twin seats only for odd columns
                            if (j % 2 == 1) {
                                if (current->status) {
                                    cout << "[  " << current->seatNumber << "   ]";
                                }                                   
                                    
                                else {
                                    cout << "[  \033[31m" << "XXX" << "\033[0m   ]";
                                }
                            }
                            else {
                                cout << "";
                            }
                            break;
                        } 
                        else {
                            if(current->status) {
                                cout << "[" << current->seatNumber << "]";                                                               
                            } 
                            else { 
                                if(j<10){
                                    cout << "[\033[31m" << "XX" << "\033[0m]";
                                }          
                                else {
                                    cout << "[\033[31m" << "XXX" << "\033[0m]";
                                }             
                                
                            }
                        }
                        break;
                    }
                    current = current->Next;
                }
            }

            if (i == 18 || i == 19 || i == 20 || i == 21) {
                cout << "\t\t| " << current->seatType;
            }
            else{
                cout << "\t| " << current->seatType;
            }
            cout << endl << endl;
        }

        // Display Seat Availability
        cout << "\n[\033[31m" << "X" << "\033[0m] Booked\t";
        cout << "[No.] Available\t" << endl << endl;

        cout << "---\tTicket Price\t---" << endl;
        cout << "Green\t\t\t: RM15.00" << endl;
        cout << "Yellow\t\t\t: RM20.00" << endl;
        cout << "Orange\t\t\t: RM25.00" << endl;
        cout << "Blue (Twin Seats)\t: RM45.00" << endl << endl << endl;

        cout << "---\tPromotion\t---" << endl;
        cout << "Children (below 12 years old) will enjoy 50% discount except twin seats." << endl << endl;
        cout << "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------" << endl << endl;
            

    }

    // Function to determine the row and column from the seat number
    pair<int, int> getRowAndColumn(const string& seatNumber) {
        char rowChar = seatNumber[0];
        int row = rowChar - 'A' + 1; // Convert A to 1, B to 2, etc.

        int column;
        istringstream(seatNumber.substr(1)) >> column; // Convert the remaining part to an integer

        return make_pair(row, column);
    }

    bool validateSeatInput(const string& seatInput, pair<int, int>& rowAndColumn) {
        if (seatInput.length() < 2) {
            return false; // Invalid input format
        }

        char rowChar = seatInput[0];
        int column;
        if (sscanf(seatInput.c_str() + 1, "%d", &column) != 1) {
            return false; // Invalid column format
        }

        int row;
        if (rowChar >= 'A' && rowChar <= 'V') {
            row = rowChar - 'A' + 1;
        } 
        else {
            return false; // Invalid row
        }

        if (row >= 1 && row <= 18) {
            if (column < 1 || column > 32) {
                return false; // Invalid column for non-twin seats
            }
        } 
        else if (row >= 19 && row <= 22) {
            if (column % 2 != 1) {
                return false; // Twin seats must have odd column numbers
            }
            else if (column <= 9 || column >= 24) {
                return false;
            }
        } 
        else {
            return false; // Invalid row
        }

        rowAndColumn = make_pair(row, column);
        return true;
    }

    bool isAisle(int row, int column) {
        if (row+1 <= 5) {
            return (column == 6 || column == 27);
        } 
        else if (row+1 == 6) {
            return (column == 6 || column == 7 || column == 26 || column == 27);
        } 
        else if (row+1 >= 7 && row+1 <= 15) {
            return (column == 6 || column == 7 || column == 8 || column == 25 || column == 26 || column == 27);
        } 
        else if (row+1 >= 16 && row+1 <= 18) {
            return (column == 6 || column == 7 || column == 8 || column == 9 || column == 24 || column == 25 || column == 26 || column == 27);
        } 
        else {
            return (column <= 9 || column >= 24);
        }
    }


    bool areSeatsBooked(const vector<Node*>& hall, int row, int column, int numberOfTickets) {
        Node* current = hall[row - 1];

        for (int i = column; i < column + numberOfTickets; ++i) {
            while (current != nullptr) {
                if (stoi(current->seatNumber.substr(1)) == i) {
                    if (!current->status) {
                        return true; // At least one seat is already booked
                    }
                    break; // Break the loop for the current seat
                }
                current = current->Next;
            }
            current = hall[row - 1]; // Reset current pointer for the next seat
        }

        return false; // No booked seats in the consecutive range
    }


    void printReceipt(char *C_Date, string Movie, int hallNUM, int N_tickets, int Child_Tickets, char row, int column, string seatType, float unitPrice, float discount, float TotalPrice) {
        system("cls");
        cout << "\t\tCustomer Receipt" << endl;
		cout << "----------------------------------------------" << endl;
		cout << "Ticket Ordered\t: " <<  C_Date << endl;
        cout << "Movie Name\t: " << Movie << endl;
        cout << "Hall\t\t: Hall " << hallNUM << endl;

        cout << "\nSeats Number\t: ";
        if(selectedRow == 19 || selectedRow == 20 || selectedRow == 21 || selectedRow == 22) {
            for(int count = 0; count < numberOfTickets/2; count++) {
                cout << row << column + count + count << " ";
            }
        }
        else {
            for(int count = 0; count < numberOfTickets; count++) {
                cout << row << column + count << " ";
            }
        }

        cout << " [" << seatType << " Area]";

		cout << "\n\nTotal number of tickets\t  : " << N_tickets << endl;
		cout << "Number of children tickets: " << Child_Tickets << endl << endl;
		
		
        cout << "Ticket Price\t:   RM " << setprecision(2) << TotalPrice + discount << " (RM " << unitPrice << " * " << N_tickets << ")" << endl;
        cout << "Discount\t: - RM " << setprecision(2) << discount << endl;
		cout << "----------------------------------------------" << endl;
		cout << "Total Price\t:   RM " << setprecision(2) << TotalPrice << endl << endl << endl;
	}
 };