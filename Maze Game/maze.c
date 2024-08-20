#include <stdio.h>
#include <stdlib.h>

void printMap( char map[13][12],int row, int col);
char lowerCase(char ch);
char getDirection();
void move(char ch, char map[13][12]);
int startRow = 9;
int startCol = 11;
int endRow = 3;
int endCol = 0;
int totalpoint = 0;

int main(){
   int login,p1=0,p2=0,p3=0,totalp=0,pe1=0,pe2=0,petotal=0;
	
	wel:
	fflush(stdin);		
	printf("\n\nWelcome to Maze !\n\n");	
	printf("[1] Login as a player\n");
	printf("[2] Login as an administrator\n\n");
	printf(" Select Your Choice : ");
		scanf("%d", &login);
		
	if(login==1){
     goto Map;	
	}
	
	else if(login==2){
		
		system:
		
			pointinput:	
			printf("\n\nWelcome to Point System\n\n");	
			printf("Please Enter the Point for the following 3 levels :- \n");
			printf("Note : Maximum total points for the 3 levels below are 100 points !\n\n");
						
			printf("Level 1 : ");
				scanf("%d", &p1);
			printf("Level 2 : ");
				scanf("%d", &p2);
			printf("Level 3 : ");
				scanf("%d", &p3);
		
			totalp=p1+p2+p3;
			if(totalp>100){
				printf("\nYour Total Points have exceed the point limit of 100 ! Please try again !\n\n");
				goto pointinput;
			}
			if(totalp >0 && totalp<=100){	
		printf("\nPoint has been recorded !\n\n");
		goto penaltyinput;
		}
	        else {
			printf("Please enter valid point.\n");	
			goto pointinput;
			}
			
		penaltyinput:
			printf("\n\nWelcome to Penalty System\n\n");		
			printf("Please Enter the Penalty Point for the Obstacle Course :- \n\n");
			printf("Players Backtrack their move : ");
				scanf("%d", &pe1);
			printf("Player wait for turn : ");
				scanf("%d", &pe2);
			
			petotal=pe1+pe2;
				
			if(petotal>50){
				printf("\nYour Total Penalty Points have exceed the point limit of 50 ! Please try again !\n\n");
				goto penaltyinput;
			}
			
			else if(petotal >0 && petotal<=50){
				printf("\nPoint has been recorded !\n\n");
				goto wel;
	}
	else {
			printf("Please enter valid point.\n");	
			goto penaltyinput;
			}
            
	}
	else{
		printf("\n\nInvalid Input ! Please Enter the Correct Choice !");
		goto wel;
	
	}

	Map:
		fflush(stdin);
    char map[13][12]={
    //0  //1 //2 //3 //4 //5 //6 //7 //8//9//10//11
   	{'#','#','#','#','#','#','#','#','#','#','#','#'}, //0
   	{'#',' ',' ',' ',' ','#',' ',' ',' ',' ',' ','#'}, //1
   	{'#','#',' ','#',' ','#',' ','#',' ','#',' ','#'}, //2
   	{' ',' ',' ','#',' ',' ',' ','#',' ','#',' ','#'}, //3
   	{'#','#','#','#','#','#',' ','#',' ','#',' ','#'}, //4
   	{'#',' ',' ',' ',' ',' ',' ','#',' ','#',' ','#'}, //5
   	{'#','#','#','#','#','#','#','#',' ','#',' ','#'}, //6
   	{'#',' ',' ',' ',' ',' ',' ',' ',' ','#',' ','#'}, //7
   	{'#',' ','#','#','#','#','#','#','#','#','#','#'}, //8
   	{'#',' ',' ',' ',' ',' ',' ',' ','#',' ',' ','X'}, //9
   	{'#',' ','#','#','#','#','#',' ','#',' ','#','#'}, //10
   	{'#',' ',' ',' ',' ',' ','#',' ',' ',' ',' ','#'}, //11
   	{'#','#','#','#','#','#','#','#','#','#','#','#'}, //12
   };
   /*int size = sizeof(map);
   printf("size = %i\n",size); */
   /*int size = sizeof(map[1]);
    printf("size = %i\n",size); */
      
    int row = sizeof(map) / sizeof(map[1]); 
    int col = sizeof(map[1]);

 	
   printMap(map,row,col);
  do{
  	 char ch = getDirection();
   move(ch,map); 
   printMap(map,row,col);
   if(map[8][1]=='X'){
   	totalpoint=p1-pe1;
   	printf("\n\nLevel 1 passed ! Your current point is %d", totalpoint);   	
   }
   if(map[2][8]=='X'){
   	totalpoint = p1 + p2 - pe1;
   	printf("\n\nLevel 2 passed ! Your current point is %d", totalpoint); 	
   }
   if(map[11][1]=='X'){
   	printf("\n\nBacktrack your move by 5 ! %d points have been deducted", pe1);
   	if(map[startRow-2][startCol+3] != '#'){
   			map[startRow][startCol] = 'x';
   			map[startRow-2][startCol - +3] = 'X';
   			startCol = startCol + 3;
   			startRow-=2;
		   }
   }
   if(map[5][6]=='X'){
   	printf("\n\nWait for your turn ! %d points have been deducted", pe2);
   }
   if(map[7][10]=='X'){ 
  	printf("\n\nRestart your journey ! Your point have become 0 ! ");
  	if(map[startRow+2][startCol+1] != '#'){
   			map[startRow][startCol] = 'x';
   			map[startRow+2][startCol +1] = 'X';
   			startCol = startCol + 1;
   			startRow+=2;
		   }
  	goto wel;
   }
   if(startRow == endRow && startCol == endCol){
   	break;
   }
  }while(1);
  printf("\n\nCongratulation, you've successfully get out of the maze.\n");
  printf("Total point gained:  %d\n", totalpoint= p1 + p2 + p3 - pe1 - pe2);
  printf("The winner is player 1.\n");
   return 0;
}

char getDirection(){
	printf("\n\nGame Rules :-\n");
	printf("1) Do not touch the wall otherwise you will restart the journey, backtrack your move or wait for turn.\n");
	printf("2) Use w,a,s,d keys to move (w-up   a-left   s-down   d-right).\n");
	printf("3) Points will be gain while finished every level (Level 1 + Level 2 + Level 3 =100).\n");
	printf("4) Points will be lose while player makes a mistake such as an incorrect turn or move through a route taken in the maze\n");
	printf("5) Player who get highest points will be the winner.\n\n\n");
	printf("Press w, a, s, d, one of the character to control the direction and start moving\n");
   char ch;
   scanf("%c",&ch);
   setbuf(stdin, NULL);
   ch = lowerCase(ch);
   return ch;
}
	
void move(char ch, char map[13][12]){
	switch(ch){
   	case 'w':
   		//printf("Moving upward.\n");
   		if(map[startRow - 1][startCol] != '#'){
   			map[startRow][startCol] = 'x';
   			map[startRow - 1][startCol] = 'X';
   			startRow = startRow - 1;
		   }
		   
   		break;
   		case 's':
   		//printf("Moving downward.\n");
   			if(map[startRow + 1][startCol] != '#'){
   			map[startRow][startCol] = 'x';
   			map[startRow + 1][startCol] = 'X';
   			startRow = startRow + 1;
		   }
   		break;
   		case 'a':
   		//printf("Moving backward.\n");
   			if(map[startRow ][startCol - 1] != '#'){
   			map[startRow][startCol] = 'x';
   			map[startRow][startCol - 1] = 'X';
   			startCol = startCol - 1;
		   }
   		break;
   		case 'd':
   		//printf("Moving foward.\n");
   		if(map[startRow ][startCol + 1] != '#'){
   			map[startRow][startCol] = 'x';
   			map[startRow][startCol + 1] = 'X';
   			startCol = startCol + 1;
		   }
   		break;
   		default:
   			printf("Invalid direction.\n");
   		
   }
   
}
char lowerCase(char ch){
	if(ch >= 'A' && ch <= 'Z'){
	return ch = ch + ('a' - 'A'); 
	}
	return ch;
}
void printMap(char map[13][12],int row, int col){
	system("cls");
	 for(int i = 0; i <row; i++){
   	for(int j = 0; j < col; j++){
   		printf("%c", map[i][j]);
	   }
	   printf("\n");
   }
}