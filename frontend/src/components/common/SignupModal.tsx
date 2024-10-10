import styles from "./SignupModal.module.css";

type SignupModalProps = {
    show: boolean;
    handleClose: () => void;
    handleLogin: () => void;
  }
const SignupModal = ({show, handleClose, handleLogin}: SignupModalProps) => {
  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
    <div className={`modal-dialog modal-dialog-centered mx-auto ${styles.customModal}`}>
      <div className="modal-content">
      <div className={`modal-header ${styles.customHeader}`}>
          <div className={styles.titleContainer}>
              <h4 className="modal-title">REGISTER</h4>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
      </div>
        <div className="modal-body">
          <form>
          <div className="form-group mb-3">
              <label htmlFor="email" className="mb-2 fw-semibold">Full Name</label>
              <input type="text" className="form-control" id="fullname" placeholder="Enter full name" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="mb-2 fw-semibold">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="mb-2 fw-semibold">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="d-grid mb-2 ">
              <button type="submit" className={`btn btn-primary ${styles.btn}`}>Sign up</button>
            </div>
            <p className="text-center">Already have an account? <a href="#" className={styles.signup} onClick={handleLogin}> Login</a></p>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SignupModal
