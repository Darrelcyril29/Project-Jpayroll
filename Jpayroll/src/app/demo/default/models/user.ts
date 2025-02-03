export class User {
    username: string;
    id: string;
    usertype: string;
  
    constructor(username, id, usertype) {
      this.username = username;
      this.id = id;          
      this.usertype = usertype; 
    }
  
    // Method to display user details
    getUserDetails() {
      return `Username: ${this.username}, ID: ${this.id}, User Type: ${this.usertype}`;
    }
  
    // Optionally, you can add setters and getters for better encapsulation
    setUsername(username) {
      this.username = username;
    }
  
    getUsername() {
      return this.username;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getId() {
      return this.id;
    }
  
    setUsertype(usertype) {
      this.usertype = usertype;
    }
  
    getUsertype() {
      return this.usertype;
    }
  }
  