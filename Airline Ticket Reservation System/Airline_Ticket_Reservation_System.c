#include <stdio.h>
#include <time.h>
#include <stdlib.h>

void menu(void);
void reserveticket(void);
void ticket(void);
void display(void);
void cancel(void);
void back(void);
void payment(void);

	int location,option,i,j,bookingid,cancelbookingid,confirmation;
	char regusername[15],regpassword[15],username[15],password[15];
	char map[2][5];
	
void main(void){
	printf("~~~~~Registration Page~~~~~\n\n");
	printf("Enter Username : ");
		scanf("%s", &regusername[0]);
	printf("Enter Password : ");
		scanf("%s", &regpassword[0]);
		
	login:
		
	printf("\n\n~~~~~Login Page~~~~~\n\n");
	printf("Enter Username : ");
		scanf("%s", &username[0]);
	printf("Enter Password : ");
		scanf("%s", &password[0]);
	
	if(*username==*regusername&& *password==*regpassword){
		printf("\nLogin Succesful!\n");
	menu();
	}
	else
		printf("\nInvalid username or password!");
		goto login;		
}

void menu(void){
	printf("\n~~~~~Main Menu~~~~~\n\n");
	printf("1 - Display Seating Arrangment\n2 - Reserve Ticket\n3 - Cancel Reservation\n4 - Payment\n5 - Exit\n\n");
	
	printf("Enter your option (1-5) : ");
		scanf("%d", &option);
	
	if(option==1){
		printf("\n\n~~~~~Seating Arrangement~~~~~\n\n");
			for(int i=0;i<2; i++){
	  for(int j=0; j<5; ++j)
	    map[i][j] = '$';
    }

	 for(int i=0;i<2; i++){
	  for(int j=0; j<5; ++j)
	    printf("X [%c] X",map[i][j]);
	  printf("\n");  
	}
		
		printf("\n\n~~~~~Notes~~~~~\n XX = 1 meter \n[$] = Seat can be Reserve\n[X] = Seat Reserved\n\n");
		back();
	}	
	else if(option==2){
		reserveticket();
	}
	
	else if(option==3){
		cancel();
	}
	else if(option==4){
		payment();
	}
	else if(option==5){
		_Exit(0);
	}
	else{
		printf("\nInvalid choice ! Please try again.\n");
		menu();
	}		
}

void back(void){
		printf("0 - Back to Main Menu\n1 - Reserve Ticket\n\n");
		printf("Select your choice : ");
			scanf("%d", &option);
			
		if(option==0){
			puts("");
			menu();
		}	
		else if(option==1){
			puts("");
			reserveticket();
		}
		else{
			puts("");
			printf("Error!\n\n");
		back();
		}
}

void reserveticket(void){
		printf("\n~~~~~Reserve Ticket~~~~~\n\n");
		display();
	}
	
void display(void){
	for(int i=0;i<2; i++){
	  for(int j=0; j<5; ++j)
	    map[i][j] = '$';
    }
    
	 puts("");
	 for(int i=0;i<2; i++){
	  for(int j=0; j<5; ++j)
	    printf("X [%c] X",map[i][j]);
	  printf("\n");  
	 }
	 
	printf("\n\n~~~~~Notes~~~~~\n XX = 1 meter \n[$] = Seat can be Reserve\n[X] = Seat Reserved\n\n");
	
	input2:
	 
	printf("\nEnter location [1-10] : ");
     	scanf("%d", &location);
     
    if(location>0 && location<11){
        for(i=0; i<2; i++){    
         for(j=0;j<5; ++j){   
           if(i==0){
           	 if(i+j+1 == location){
		       map[i][j] = 'X';
		       break;
		     }
		   }
		   else if(i==1){
             if(i+j+5 == location){
		      map[i][j] = 'X';
		      break;
     	     }
           }
         } 
       }
	ticket();		
	}
    else
	   	printf("\nInvalid Seat!\n\n");		   	 
	display();  	
}

void ticket(void){
	srand(time(NULL));
	bookingid=1000+rand()%8999;
	
	printf("\t============================================================");
	printf("\n\t~~~~~~~~~~~~~~~~~~~AIRLINE BOOKING TICKET~~~~~~~~~~~~~~~~~~~\n");
    printf("\t============================================================\n");
    printf("\t Booking ID : %d   \t\t\tFlight No : MH 520\n",bookingid);
    printf("\t Passenger  : %s\t\t\tDate      : 22-7-2022\n",regusername);
    printf("\t Seats No.  : %d\t\t\t\tTime      : 9 a.m.\n", location);
    printf("\t============================================================\n");
    
    menu();
}

void cancel(void){
	printf("\n~~~~~Cancel Reservation~~~~~\n\n");
	printf("Enter your booking id : ");
		scanf("%d", &cancelbookingid);
	
	if(cancelbookingid==bookingid){
		input3:
		printf("\nAre you confirm to cancel your Reservation? Yes-[1] No-[2] : ");
			scanf("%d", &confirmation);
		if(confirmation==1){
			printf("\nYour ticket reservation has been cancel !\n");
		}
		else if(confirmation==2){
			menu();
		}
		else{
			printf("Invalid Input");
			goto input3;
		}
	}
	else{
		printf("\nInvalid Booking ID ! Please try again.\n");
	cancel();
	}
	menu();
}

void payment(void){

	int seniors,adults,child,infant,paybookingid,type,cost;
	
	printf("\n\n~~~~~Payment Processing~~~~~\n\n");
	input4:
	printf("Enter your booking id : ");
		scanf("%d", &paybookingid);
	if(paybookingid==bookingid){
		printf("\n\nPlease select your ticket type:	\n[1] Seniors\n[2] Adults\n[3] Child\n[4] Infant\n\n");
		printf("Enter your choice : ");
			scanf("%d", &type);
			
		if(type==1){
			cost=400;
		}
		else if(type==2){
			cost=500;
		}
		else if(type==3){
			cost=250;
		}
		else if(type==4){
			cost=50;
		}
		else{
			printf("\nInvalid Input ! Please try again.\n\n");
			goto input4;
		}
		
		printf("\nYour ticket price is RM %d\n\n", cost);
		
		printf("\t============================================================");
		printf("\n\t~~~~~~~~~~~~~~~~~~~~~~Payment Invoice~~~~~~~~~~~~~~~~~~~~~~~\n");
    	printf("\t============================================================\n");
    	printf("\t Booking ID : %d   \t\t\tFlight No  : MH 520\n",bookingid);
    	printf("\t Passenger  : %s\t\t\tTotal Cost : RM %d\n", regusername,cost);
    	printf("\t============================================================\n");
			
	}
	else{
		printf("\nInvalid Booking ID ! Please try again.\n");
		payment();
	}
	menu();
}