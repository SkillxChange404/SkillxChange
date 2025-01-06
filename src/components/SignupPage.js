<!DOCTYPE html>
<html>
<head>
    <title>SkillxChange Signup</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap" rel="stylesheet">
</head>
<body>

    <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true">

        <div class="signup"> <!--Sign up-->
            <form>
                <label for="chk" aria-hidden="true">SkillxChange</label>
                <input type="text" name="txt" placeholder="First Name" required="">
                <input type="text" name="txt" placeholder="Last Name" required="">
                <input type="email" name="email" placeholder="Email" required="">
                <input type="Password" name="pswd" placeholder="Password" required="">
                <button type="submit" class="btn">Sign Up</button>
            </form>
        </div>
        <div class="login"> <!--Login-->
            <form>
                <label for="chk" aria-hidden="true">Login</label>
                <input type="email" name="email" placeholder="Email" required="">
                <input type="Password" name="paswd" placeholder="Password" required="">
                <a href="#">Forgot password?</a>
                <button type="submit" class="btn">Login</button>
                </div>
        
                <!--CSS-->

            <style> 
                body {
                    margin: 0;
                    padding: 0;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    font-family: 'Jost', sans-serif;
                    background: url('https://media.istockphoto.com/id/1535878692/photo/paint-roller-with-green-stroke-isolated-on-white.jpg?s=2048x2048&w=is&k=20&c=SZV_3NxQ_wJJTl7yBDqa3ZP55d2hj5bRVlvM09djOkw=');
                    display: flex;
                    animation: spin;
                    animation-duration: 3s;


                }
                @keyframes spin {
                    0% {

                    }
                    50%{
                        scale: 2;

                    }
                    100%{
                        transform: rotate(360deg);
                        border-radius: 50%;
                    }
                }

                @media (max-width: 768px) {
                    label, input, textarea, button {
                        font-size: larger;
                    }
                }

                @media (max-width: 480px) {
                    form {
                        width: 100%;
                    }
                }

                .main {
                    width: 350px;
                    height: 500px;
                    background: red;
                    overflow: hidden;
                    background: url('https://www.cm3.com.au/wp-content/uploads/2022/06/2022-06_Cm3-Blog_What-Is-Principal-Contractor.jpg') no-repeat center / cover;
                    border-radius: 10px;
                    box-shadow: 5px 20px 50px rgb(250, 250, 250)
                }

                #chk {
                    display: none;
                }

                .signup {
                    position: relative;
                    width: 100%;
                    height: 100%;
                }

                label {
                    color:white;
                    font-size: 2.3em;
                    justify-content: center;
                    display: flex;
                    margin: 60px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: .5s ease-in-out;
                
                }
                
                input {
                    width: 60%;
                    height: 20px;
                    background: rgb(255, 255, 255);
                    justify-content: center;
                    display: flex;
                    margin: 20px auto;
                    padding: 10px;
                    border:none;
                    outline: none;
                    border-radius: 5px;

                }

                button {
                    width: 60%;
                    height: 40px;
                    margin: 10px auto;
                    justify-content: center;
                    display: block;
                    color: aliceblue;
                    background: rgb(114, 220, 53);
                    font-size: 1em;
                    font-weight: bold;
                    margin-top: 20px;
                    outline: none;
                    border: none;
                    border-radius: 5px;
                    transition: .2s ease-in-out;
                    cursor: pointer;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse{
                    0%, 100% { transform: scale(1);}
                    50% { transform: scale(1.05);}
                }

                button:hover {
                    background: rgb(245, 38, 38);

                }

                .login {
                    height: 460px;
                    background: rgb(255, 255, 255) url('https://c8.alamy.com/comp/2MT33W3/contractor-icon-monochrome-simple-sign-from-common-tax-collection-contractor-icon-for-logo-templates-web-design-and-infographics-2MT33W3.jpg') ;
                    border-radius: 60% / 10%;
                    transform: translateY(-180px);
                    transition: .8s ease-in-out;
                }

                .login label {
                    color:purple;
                    transform: scale(.6);


                }

                #chk:checked ~ .login {
                    transform: translateY(-500px);
                }

                #chk:checked ~ .login label {
                    transform: scale(1);
                }

                #chk:checked ~ .signup label {
                    transform: scale(.6);
                }


            </style>
            <button>Login</button>

            </form>
        </div>
    </div>
</body>
</html>
