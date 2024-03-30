export const userService = {
    authenticate,
  };
  
  function authenticate(email: string, password: string) {
    console.log("gelloo")
    // if(email !== "admin" && password !== "admin") { //(1)
    //   return null; //(2)
    // }
  
    const user = { 
      id: "9001",
      name: "Web Admin", 
      email: "admin@example.com"}; //(3)
  
    return user; //(4) 
  }
  