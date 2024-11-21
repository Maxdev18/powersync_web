import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { VerifcationAPI } from "../../APIs/Verification"
import { Response } from "../../Types/Response"
import { UserAPI } from "../../APIs/User"
import "./verification.css"

export const VerificationPage: React.FC = () => {
  const [code, setCode] = useState<string>("")
  const [newPassword, setNewPassword] = useState("")
  const [newPassword2, setNewPassword2] = useState("")
  const [isError, setIsError] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const navigate = useNavigate()

  async function handleVerification() {
    const response: Response = await VerifcationAPI.verifyCode(localStorage.getItem("codeId") as string, code)
    
    if(response.isError) {
      setIsError(true)
    } else {
      setIsError(false)
      setIsVerified(true)
    }
  }

  async function handleSavePassword() {
    if(newPassword !== newPassword2) {
      setIsWrongPassword(true)
      setMessage("Passwords don't match")
    } else {
      const id = JSON.parse(localStorage.getItem("user") as string).id
      const response: Response = await UserAPI.updatePassword(id as string, newPassword)
      if(response.isError) {
        setIsWrongPassword(true)
        setMessage(response.message)
      } else {
        setIsWrongPassword(false)
        navigate("/dashboard")
      }
    }
    
  }

  return (
    <div className="verification-container">
      {isVerified ? 
        <div className="verification-code-container">
          <input type="password" className="verification-password-input" placeholder="New password" required value={newPassword} onChange={(elem) => setNewPassword(elem.target.value)}/>
          <input type="password" className="verification-password-input" placeholder="Re-enter new password" required value={newPassword2} onChange={(elem) => setNewPassword2(elem.target.value)}/>
          {isWrongPassword ? <p className="verification-error-message">{message}</p> : null}
          <button onClick={handleSavePassword} className="verification-btn">Save password</button>
        </div>
        : <div className="verification-code-container">
          <h1>Enter verification code</h1>
          <input type="text" className="verification-input" placeholder="000 000" required value={code} onChange={(elem) => setCode(elem.target.value)}/>
          {isError ? <p className="verification-error-message">Please enter correct verification code</p> : null}
          <button onClick={handleVerification} className="verification-btn">Verify</button>
        </div>
      }
    </div>
  )
}