/**
 * A Basic Journal Program for inputting daily info
 * 
 * @author Tobias Ephron
 * @version Version 1 (1/16/2021)
 */

import java.util.*;

public class Journal{

	String[] questions = {"How was your day? (1-10)", "Did you code today?"};
	private String[] answers;

	public Journal(){
		this.questions = questions;
		this.answers = new String[questions.length];
	}

	public static void main(String[] args){
		Journal j = new Journal();
	}


	public void askQuestions(){

	}
}