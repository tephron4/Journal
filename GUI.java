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
	private static JPanel journalPanel;
	private static JFrame journalFrame;
	
	private static JLabel usernameLabel;
	private static JTextField usernameField;
	private static JLabel passwordLabel;
	private static JPasswordField passwordField;
	private static JButton loginButton;
	private static JLabel loginSuccess;

	private static JLabel dateLabel;
	private static JTextField dateField;
	private static JButton dateButton;
	private static JLabel dateCheckSuccess;
	
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
					journalFrame.setVisible(true);
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
		
		// Journal Section:
		
		journalPanel = new JPanel();
		journalFrame = new JFrame();
		journalFrame.setSize(500, 800);
		journalFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		journalFrame.setTitle("Journal");
		journalFrame.add(journalPanel);
		
		journalPanel.setLayout(null);

		dateLabel = new JLabel("Date (MM/DD/YYYY):");
		dateLabel.setBounds(80, 10, 120, 25);
		journalPanel.add(dateLabel);

		dateField = new JTextField();
		dateField.setBounds(200, 10, 165, 25);
		journalPanel.add(dateField);

		dateButton = new JButton("Set Date");
		dateButton.addActionListener(new ActionListener(){
			public void actionPerformed(ActionEvent e){
				String d = dateField.getText();
				d = j.parseDate(d);
				if(d.equals("invalid")){
					dateCheckSuccess.setText("Invalid Date");
				}
				else{
					j.setDate(d);
					dateCheckSuccess.setText("Success");
				}
			}
		});
		dateButton.setBounds(100, 40, 90, 25);
		journalPanel.add(dateButton);

		dateCheckSuccess = new JLabel("");
		dateCheckSuccess.setBounds(200, 40, 300, 25);
		journalPanel.add(dateCheckSuccess);

		
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
