import React from 'react';

function Error() {
    return (
        <>
            <div style={{ width: "100%", height: "100px", margin: "15% auto",justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>
                <h1 style={{display: 'flex', justifyContent: "center",/* alignItems: "center"*/margin: '15px auto 5px auto',textAlign:'center'}}>404</h1>
                <h3>Page not found</h3>
            </div>
        </>
    );
}

export default Error;