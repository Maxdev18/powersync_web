import "./verification.css"

export const VerificationPage: React.FC = () => {
  function handleVerification() {

  }

  return (
    <div className="verification-container">
      <h1>Enter verification code</h1>
      <input type="text" className="verification-input" placeholder="000 000" required />
      <button onClick={handleVerification} className="verification-btn">Verify</button>
    </div>
  )
}