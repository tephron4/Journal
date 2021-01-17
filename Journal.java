/**
 * A Basic Journal Program for inputting daily info
 * 
 * @author Tobias Ephron
 * @version Version 1 (1/16/2021)
 */

import java.util.*;
import java.io.IOException;

public class Journal{

	String[] questions = {"How was your day? (1-10)", "Did you code today?", "Did you read today and what did you read?", "Workout?", "How much water did you drink?"};
	private String[] answers;
	Scanner scan;

	public Journal(){
		this.questions = questions;
		this.answers = new String[this.questions.length];
		for(int i=0;i<this.answers.length;i++){
			this.answers[i] = " ";
		}
		this.scan = new Scanner(System.in);
	}

	public static void main(String[] args){
		Journal j = new Journal();

		System.out.println("");
		System.out.println("Hello");
		String ans = j.scan.nextLine();

		//j.printQuestions();

		//j.printDisplay();

		j.menu();


	}

	public void menu(){
		String ques = "-1";
		int quesNum = -1;
		while(true){
			this.printDisplay(true);
			
			System.out.println("What would you like to answer/change (give number)?");
			
			ques = "-1";
			quesNum = -1;
			
			boolean change = false;
			//boolean validIn = false;

			while(Integer.parseInt(ques) < 0){
				try{
					ques = this.scan.nextLine();

					if(ques.toLowerCase().equals("none") ||  ques.toLowerCase().equals("quit")){
						return;
					}
					else{
						quesNum = Integer.parseInt(ques) - 1;
						ques = Integer.toString(quesNum);
					}
					
					change = true;
					//validIn = true;
				} catch(NumberFormatException e){
					change = false;
					break;
					//validIn = false;
				}
			}
			if(!change /**&& !validIn*/ || quesNum >= this.questions.length){
				System.out.println("");
				System.out.println("Invalid input");
				System.out.println("");
				System.out.println("Try again? (y/n)");
				System.out.println("");
				
				String ans = this.scan.nextLine();
				
				if(ans.toLowerCase().charAt(0) == 'y')
					continue;
				else{
					return;
				}
			}
			else{
				this.clearScreen();

				System.out.println("");
				System.out.println(quesNum+1 + " - " + this.questions[quesNum] + " -");
				System.out.println("---------------------------");
				System.out.println("");
				this.answers[quesNum] = this.scan.nextLine();
			}
		}
	}

	public void printDisplay(boolean clear){
		if(clear) this.clearScreen();

		System.out.println("");
		System.out.println("Your Journal:");
		System.out.println("");
		
		for(int i = 0; i < this.questions.length; i++){
			System.out.println(i+1  + " - " + this.questions[i] + " -");
			System.out.println("------------------------------");
			try{
				System.out.println("  " + this.answers[i]);
			} catch(ArrayIndexOutOfBoundsException ex){
				System.out.println("");
			}
			System.out.println("");
		}
	}

	public void printQuestions(){
		//this.clearScreen();
		System.out.println("");
		System.out.print("Questions:");
		System.out.println("");
		for(String q: this.questions){
			System.out.println("- " + q);
		}
		System.out.println("");
	}

	public static void clearScreen(){
		try{
			new ProcessBuilder("cmd","/c","cls").inheritIO().start().waitFor();
		} catch(IOException | InterruptedException ex){}
	}
}