
const registerTemplate = async (name,email,password) => {
    return `<div>
                  <h1 style="color:#8F7DA5;text-align:'center';text-transform:'uppercase';">
                    Hi ${name}, </h1>
                  <h3>Greetings from  Project-LMS</h3>
                  <p>We congrats you to for successfully register in our platform.</p>
                  <hr/>
                  <div>
                        <p>
                            <strong>Username</strong>: ${email}
                        </p>
                        <p>
                            <strong>Password</strong>: ${password}
                        </p>
                  </div>

                  <hr/>

                  <p>Thanking You,</p>
                  <h3>Team Project-LMS,</h3>
            </div>`
}

module.exports = registerTemplate