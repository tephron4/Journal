import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;

public class GUI {

	private static final String username = "tephron";
	private static final String password = "chand4";
	
	private static JPanel loginPanel;
	private static JFrame loginFrame;
	private static JPanel choosePanel;
	private static JFrame chooseFrame;
	private static JPanel journalPanel;
	private static JFrame journalFrame;
	private static JPanel editPanel;
	private static JFrame editFrame;

	private static JButton backButton;

	private static JLabel usernameLabel;
	private static JTextField usernameField;
	private static JLabel passwordLabel;
	private static JPasswordField passwordField;
	private static JButton loginButton;
	private static JLabel loginSuccess;

	private static JButton newPageButton;
	private static JButton editPageButton;

	private static JLabel dateLabel;
	private static JTextField dateField;
	private static JButton dateButton;
	private static JLabel dateCheckSuccess;

	private static JLabel[] qLabels;
	private static JTextField[] qTextFields;
	private static String[] questions;

	private static JButton finishButton;
	private static JLabel finishSuccess;
	
	public GUI() {

		Journal j = new Journal();

		// Login Section:
		
		loginPanel = new JPanel();
		loginFrame = new JFrame();
		loginFrame.setSize(320, 160);
		loginFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		loginFrame.setTitle("Journal Login");
		loginFrame.add(loginPanel);
		
		loginPanel.setLayout(null);
		
		usernameLabel = new JLabel("Username:");
		usernameLabel.setBounds(10, 20, 80, 25);
		loginPanel.add(usernameLabel);
		
		usernameField = new JTextField();
		usernameField.setBounds(100, 20, 165, 25);
		loginPanel.add(usernameField);
		
		passwordLabel = new JLabel("Password:");
		passwordLabel.setBounds(10, 50, 80, 25);
		loginPanel.add(passwordLabel);
		
		passwordField = new JPasswordField();
		passwordField.setBounds(100, 50, 165, 25);
		loginPanel.add(passwordField);
		
		loginButton = new JButton("Login");
		loginButton.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				String u = usernameField.getText();
				String p = new String(passwordField.getPassword());
		
				if(u.equals(username) && p.equals(password)) {
					usernameField.setText("");
					passwordField.setText("");
					loginFrame.setVisible(false);
					chooseFrame.setVisible(true);
				}
				else {
					loginSuccess.setText("Incorrect Username or Password");
				}
			}
		});
		loginButton.setBounds(10, 80, 80, 25);
		loginPanel.add(loginButton);
		
		loginSuccess = new JLabel("");
		loginSuccess.setBounds(100, 80, 300, 25);
		loginPanel.add(loginSuccess);
		
		loginFrame.setVisible(true);

		// Choose Section:

		choosePanel = new JPanel();
		chooseFrame = new JFrame();
		chooseFrame.setSize(320,160);
		chooseFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		chooseFrame.setTitle("Choose Frame");
		chooseFrame.add(choosePanel);

		choosePanel.setLayout(null);

		newPageButton = new JButton("New Page");
		newPageButton.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				chooseFrame.setVisible(false);
				journalFrame.setVisible(true);
			}
		});
		newPageButton.setBounds(100, 20, 100, 35);
		choosePanel.add(newPageButton);

		editPageButton = new JButton("Edit Page");
		editPageButton.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				chooseFrame.setVisible(false);
				editFrame.setVisible(true);
			}
		});
		editPageButton.setBounds(100, 75, 100, 35);
		choosePanel.add(editPageButton);

		// Back button defining:

		backButton = new JButton("BACK");

		// Edit Section:

		editPanel = new JPanel();
		editFrame = new JFrame();
		editFrame.setSize(500, 800);
		editFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		editFrame.setTitle("Edit");
		editFrame.add(editPanel);

		editPanel.setLayout(null);

		JLabel comingSoonLabel = new JLabel("Coming Soon");
		comingSoonLabel.setBounds(200, 380, 120, 40);
		editPanel.add(comingSoonLabel);

		backButton.setBounds(10, 10, 70, 25);
		backButton.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				editFrame.setVisible(false);
				chooseFrame.setVisible(true);
			}
		});
		editPanel.add(backButton);
		
		// Journal Section:
		
		journalPanel = new JPanel();
		journalFrame = new JFrame();
		journalFrame.setSize(500, 800);
		journalFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		journalFrame.setTitle("Journal");
		journalFrame.add(journalPanel);
		
		journalPanel.setLayout(null);

		dateLabel = new JLabel("Date (MM/DD/YYYY):");
		dateLabel.setBounds(130, 10, 110, 25);
		journalPanel.add(dateLabel);

		dateField = new JTextField();
		dateField.setBounds(260, 10, 120, 25);
		journalPanel.add(dateField);

		dateButton = new JButton("Check Date");
		dateButton.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				String d = dateField.getText().toLowerCase();
				d = j.parseDate(d);
				if(d.equals("invalid")){
					dateCheckSuccess.setText("Invalid Date");
				}
				else{
					j.setDate(d);
					dateCheckSuccess.setText("Valid Date");
				}
			}
		});
		dateButton.setBounds(140, 40, 100, 25);
		journalPanel.add(dateButton);

		dateCheckSuccess = new JLabel("");
		dateCheckSuccess.setBounds(260, 40, 120, 25);
		journalPanel.add(dateCheckSuccess);

		questions = j.getQuestions();
		
		qLabels = new JLabel[questions.length];
		for(int i = 0; i < qLabels.length; i++){
			qLabels[i] = new JLabel(questions[i]);
		}
		
		qTextFields = new JTextField[qLabels.length];
		for(int i = 0; i < qTextFields.length; i++){
			qTextFields[i] = new JTextField();
		}

		for(int i = 0; i < qLabels.length; i += 2){
			qLabels[i].setBounds(40, 75 + 65 * i, 220, 25);
			journalPanel.add(qLabels[i]);

			qTextFields[i].setBounds(40, 105 + 65 * i, 150, 25);
			journalPanel.add(qTextFields[i]);

			if(i != qLabels.length-1){
				qLabels[i+1].setBounds(280, 75 + 65 * i, 220, 25);
				journalPanel.add(qLabels[i+1]);

				qTextFields[i+1].setBounds(280, 105 + 65 * i, 150, 25);
				journalPanel.add(qTextFields[i+1]);
			}
		}

		finishSuccess = new JLabel("");
		finishSuccess.setBounds(197, 715, 120, 25);
		journalPanel.add(finishSuccess);

		finishButton = new JButton("Finish");
		finishButton.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				dateButton.doClick();
				if(dateCheckSuccess.getText().equals("Valid Date")){
					if(!j.makeFile()){
						finishSuccess.setText("Date already used");
					}
					else{
						dateCheckSuccess.setText("");
						finishSuccess.setText("Done");
						finishSuccess.setBounds(240, 715, 20, 25);
						journalPanel.remove(dateButton);
						journalPanel.remove(dateCheckSuccess);
						journalPanel.updateUI();
					}
				}
			}
		});
		finishButton.setBounds(210, 685, 80, 25);
		journalPanel.add(finishButton);

		backButton = new JButton("BACK");
		backButton.setBounds(10, 10, 70, 25);
		backButton.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				journalFrame.setVisible(false);
				chooseFrame.setVisible(true);
			}
		});
		journalPanel.add(backButton);

	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		GUI g = new GUI();


		/*int row = 0;
		int col = 0;
		for(int i = 0; i < j.questions.length; i++){
			JLabel qLabel = new JLabel(j.questions[i]);
			
		}*/

	}

}
