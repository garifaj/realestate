import styles from "./HowItWorksSection.module.css";

const HowItWorksSection = () => {
  return (
    <>
    <section className="py-5">
    <div className="container">
        <div className="row mb-5">
            <div className="col md-7 text-center">
                <h2 className={styles.title}>How It Works</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 text-center p-3">
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                style={{ width: '2.5rem', height: '2.5rem', marginBottom:"1rem" }}
            >
                <defs>
                <style>
                    {`.cls-1, .cls-2 { fill: none; stroke: #f69314; stroke-linecap: round; stroke-width: 1.5px; }
                    .cls-1 { stroke-linejoin: round; fill-rule: evenodd; }
                    .cls-2 { stroke-linejoin: bevel; }`}
                </style>
                </defs>
                <g id="ic-real-estate-search-house">
                <path
                    className="cls-1"
                    d="M22,16.81V10.07A.21.21,0,0,0,22,9.92l-9.8-7.84a.2.2,0,0,0-.25,0L2.11,9.92a.21.21,0,0,0-.07.15L2,19.84a2,2,0,0,0,2,2l10.22.07"
                />
                <circle className="cls-2" cx="12" cy="13" r="5" />
                <line className="cls-2" x1="14.91" y1="17.07" x2="19" y2="21" />
                </g>
            </svg>

                <h3 className={styles.cardtitle}>Find Property.</h3>
                <p className={styles.cardparagraph}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, 
                    laborum provident, consequatur saepe.
                </p>
            </div>
            <div className="col-md-4 text-center p-3">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                    style={{ width: '2.5rem', height: '2.5rem', marginBottom: '1rem' }}
                >
                    <circle cx="12" cy="12" r="10" stroke="#f69314" strokeWidth="1.5"></circle>
                    <path d="M12 6V18" stroke="#f69314" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path
                    d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                    stroke="#f69314"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    ></path>
                </svg>
                <h3 className={styles.cardtitle}>Buy Property.</h3>
                <p className={styles.cardparagraph}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, 
                    laborum provident, consequatur saepe.
                </p>
            </div>

            <div className="col-md-4 text-center p-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor" // Ensures the color matches the parent's font color, or override with #f69314 directly
                style={{ width: '2.5rem', height: '2.5rem', marginBottom: '1rem', color: '#f69314' }} 
            >
                <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982" />
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
                <h3 className={styles.cardtitle}>Make Investment.</h3>
                <p className={styles.cardparagraph}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, 
                    laborum provident, consequatur saepe.
                </p>
            </div>
        </div>
    </div>
    </section>
    
      
    </>
  )
}

export default HowItWorksSection
