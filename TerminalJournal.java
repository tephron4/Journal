/**
 * A Basic Journal Program for inputting daily info that runs in the terminal
 * 
 * @author Tobias Ephron
 * @version Version 1 (1/16/2021)
 */

import java.util.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class TerminalJournal{

	String[] questions = {"How was your day? (1-10)", "Did you code today?", "Did you read today and what did you read?", "Workout?", "How much water did you drink?"};
	private String[] answers;
	String date;

	private String filePath;
	private File entry;
	private FileWriter writer;

	Scanner scan;

	String[] months = {"january", "jan", "1", "01", "february", "feb", "2", "02",
						"march", "mar", "3", "03", "april", "apr", "4", "04",
						"may", "5", "05", "june", "jun", "6", "06", "july",
						"jul", "7", "07", "august", "aug", "8", "08", 
						"september", "sept", "sep", "9", "09", "october", "oct", "10",
						"november", "nov", "11", "december", "dec", "12"};

	String blank = " ";
	String dash = "-";

	public TerminalJournal(){
		this.questions = questions;
		this.answers = new String[this.questions.length];
		for(int i=0;i<this.answers.length;i++){
			this.answers[i] = " ";
		}

		this.scan = new Scanner(System.in);

		while(true){
			try{
				this.date = this.getDate();
				if(this.date.equals("quit")) System.exit(0);
				this.filePath = "C:\\Users\\tobia\\JournalEntries\\" + this.date + "journal.txt";
			} catch(InterruptedException e){
				continue;
			}
			
			if(!this.makeFile()){
				continue;
			}

			break;
		}


	}

	public static void main(String[] args){
		TerminalJournal j = new TerminalJournal();

		//System.out.println("");
		//System.out.println("Hello");
		//String ans = j.scan.nextLine();

		//j.printQuestions();

		//j.printDisplay();

		j.menu();

		j.writeToFile();
	}

	public boolean makeFile(){
		try{
			this.entry = new File(this.filePath);
			if(!this.entry.createNewFile()){
				System.out.println("A journal for " + this.date + " has already been created.");
				try{
					Thread.sleep(5000);
				} catch(InterruptedException e){

				}
				return false;
			}
		} catch(IOException e){
			System.out.println("");
			System.out.print("FILE CREATION ERROR: " + e.getMessage());
			try{
				Thread.sleep(5000);
			} catch(InterruptedException ex){

			}
			return false;
		}
		return this.makeFileWriter();
	}

	public boolean makeFileWriter(){
		try{
				this.writer = new FileWriter(this.filePath);

			} catch(IOException e){
				System.out.println("");
				System.out.println("FILEWRITER CREATION ERROR: " + e.getMessage());
				try{
					Thread.sleep(5000);
				} catch(InterruptedException ex){
					
				}
				return false;
			}
		return true;
	}

	public void writeToFile(){
		try{
			this.writer.write(this.date + "Journal \n \n");
			this.writeEntries();
			this.writer.close();
		} catch(IOException e){
			System.out.println("Error");
			return;
		}
		System.out.println("Success");
	}

	public void writeEntries() throws IOException{
		for(int i = 0; i < this.questions.length; i++){
			if(i % 2 == 0 && i != this.questions.length-1){
				this.writer.write(this.questions[i]);
			}
			else if(i % 2 == 1){
				this.writer.write(blank.repeat(50 - this.questions[i-1].length()) + this.questions[i] + "\n");
				this.writer.write(dash.repeat(this.questions[i-1].length()) +
									blank.repeat(50 - this.questions[i-1].length())+ 
									dash.repeat(this.questions[i].length()) +
									"\n");
				this.writer.write(blank.repeat(2) + this.answers[i-1] + 
									blank.repeat((50 - this.questions[i-1].length()) + (this.questions[i-1].length() - this.answers[i-1].length())) +
									this.answers[i] + "\n");
			}
			else{
				this.writer.write(this.questions[i] + "\n");
				this.writer.write(dash.repeat(this.questions[i].length()) + "\n");
				this.writer.write(blank.repeat(2) + this.answers[i] + "\n");
			}
		}
	}

	public String getDate() throws InterruptedException{
		this.clearScreen();
		
		String d = "";
		System.out.println("");

		while(d.equals("")){
			System.out.println("What's the date? (Month/Day/Year)");
			d = this.scan.nextLine().toLowerCase();
			if(d.equals("quit")) break;

			d = this.parseDate(d);

			if(d.equals("invalid")){
				this.clearScreen();
				System.out.println(" \" " + d + "\" is an invalid date.");
				Thread.sleep(5000);
				d = "";
				this.clearScreen();
				continue;
			}
		}

		return d;
	}

	public String parseDate(String date){
		String month = "";
		String day = "";
		String year = "";

		int track = 1;
		for(int i = 0; i < date.length(); i++){
			if(track == 1){
				if(date.charAt(i) == '/'){
					track = 2;
					continue;
				}
				else{
					month += date.charAt(i);
				}
			}
			else if(track == 2){
				if(date.charAt(i) == '/'){
					track = 3;
					continue;
				}
				else{
					day += date.charAt(i);
				}
			}
			else if(track == 3){
				if(date.charAt(i) == '/'){
					track = 1;
					continue;
				}
				else{
					year += date.charAt(i);
				}
			}
		}

		if(this.checkDate(month, day, year)){
			return month.toUpperCase() + " " + day + ", " + year;
		}
		
		return "invalid";

	}

	public boolean checkDate(String m, String d, String y){
		int day = -1;
		if(Arrays.asList(months).contains(m)){
			try{
				day = Integer.parseInt(d);
			} catch(NumberFormatException e){
				return false;
			}
			if(!(0 < day && day <= 31)) return false;
			try{
				int year = Integer.parseInt(y);
			} catch(NumberFormatException e){
				return false;
			}
			return true;
		}
		else return false;
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
		System.out.println("Your " + this.date + " Journal:");
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