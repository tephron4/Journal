/**
 * A Basic Journal Program for inputting daily info
 * 
 * @author Tobias Ephron
 * @version Version 1 (1/16/2021)
 */

import java.util.*;
import java.io.IOException;

public class Journal{

	String[] questions = {"How was your day? (1-10)", "Did you code today?"};
	private String[] answers;

	public Journal(){
		this.questions = questions;
		this.answers = new String[questions.length];
	}

	public static void main(String[] args){
		Journal j = new Journal();
		Scanner s = new Scanner(System.in);

		System.out.println("");
		System.out.println("Hello");
		String ans = s.nextLine();

		j.askQuestions();
	}


	public void askQuestions(){
		this.clearScreen();
		System.out.println("");
		System.out.print("Questions");
		System.out.println("");
	}

	public static void clearScreen(){
		try{
			new ProcessBuilder("cmd","/c","cls").inheritIO().start().waitFor();
		} catch(IOException | InterruptedException ex){}
	}
}