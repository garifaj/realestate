const Unauthorized = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h1 className="text-center text-danger mb-4 ">Oops!<br/> You're not authorized.</h1>
      <p className="text-center text-secondary "> 
        Looks like you've wandered into a restricted area. 
      </p>
      <p className="text-center text-secondary">
        Don't worry, it happens to the best of us! 
      </p>
    </div>
  );
};

export default Unauthorized;