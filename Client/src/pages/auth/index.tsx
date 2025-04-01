import{SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/clerk-react";
export const Authentication = ()=>{
  return(
    <div className="sign-in-container"> 
    <SignedOut>
      <SignUpButton mode = "modal"/>
      <SignInButton mode = "modal"/>
    </SignedOut>
    <SignedIn>
      <UserButton/>
    </SignedIn>
  </div>
  )
  
  
};