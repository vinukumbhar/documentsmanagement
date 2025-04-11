import pandas as pd 
import tkinter as tk
from tkinter import filedialog, messagebox

def select_file(file_type):
    file_path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
    if file_path:
        if file_type == "account":
            account_file_label.config(text=f"Selected: {file_path}")
            process_file(file_path, "account")
        elif file_type == "contact":
            contact_file_label.config(text=f"Selected: {file_path}")
            process_file(file_path, "contact")

def process_file(file_path, file_type):
    try:
        df = pd.read_csv(file_path)
        df.columns = df.columns.str.strip()  # Standardize column names
        
        account_columns = ["Account Name", "Tags", "Account Type"]
        contact_columns = [
            "Contact Name", "First Name", "Middle Name", "Last Name", "Company Name", "Street Address", "City", 
            "State / Province", "Country", "Zip / Postal Code", "Notes", "SSN", "Phone Numbers", "Email"
        ]
        
        # Dynamically find all "Linked Contact #i" and "Team Member #i" columns
        linked_contacts = [col for col in df.columns if col.startswith("Linked Contact #")]
        team_members = [col for col in df.columns if col.startswith("Team Member #")]

        if file_type == "account":
            existing_account_columns = [col for col in account_columns + linked_contacts + team_members if col in df.columns]
            if existing_account_columns:
                processed_df = df[existing_account_columns].sort_values(by="Account Name")
                save_path = "processed_accounts.csv"
            else:
                messagebox.showerror("Error", "CSV file does not match expected format.")
                return
        elif file_type == "contact":
            existing_contact_columns = [col for col in contact_columns + linked_contacts + team_members if col in df.columns]
            if existing_contact_columns:
                processed_df = df[existing_contact_columns]
                save_path = "processed_contacts.csv"
            else:
                messagebox.showerror("Error", "CSV file does not match expected format.")
                return

        processed_df.to_csv(save_path, index=False)
        messagebox.showinfo("Success", f"Output file created: {save_path}")
    except Exception as e:
        messagebox.showerror("Error", f"An error occurred: {e}")

# UI Setup
root = tk.Tk()
root.title("CSV Processor")
root.geometry("400x200")

tk.Label(root, text="Select CSV File to Process", font=("Arial", 12)).pack(pady=10)

account_button = tk.Button(root, text="Select Account CSV", command=lambda: select_file("account"))
account_button.pack(pady=5)
account_file_label = tk.Label(root, text="No file selected", font=("Arial", 10))
account_file_label.pack()

contact_button = tk.Button(root, text="Select Contact CSV", command=lambda: select_file("contact"))
contact_button.pack(pady=5)
contact_file_label = tk.Label(root, text="No file selected", font=("Arial", 10))
contact_file_label.pack()

root.mainloop()
