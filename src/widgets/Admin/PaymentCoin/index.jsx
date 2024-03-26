import React, { useState, useEffect } from "react";
import Spring from '@components/Spring';
import { useWindowSize } from 'react-use';
import CustomSelect from '@ui/CustomSelect';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Tabs } from '@mui/material';
import {useAuthContext} from "@hooks/useAuthContext";
import axios from "axios";
import classNames from "classnames";
import Tesseract from 'tesseract.js';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdScreenshotMonitor } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import imagetransaction from '@assets/fans/transactionimage.png';

const App = () => {
  const [tournamentId, setTournamentId] = useState("");
  const [title, setTitle] = useState("");
  const [tournaments, setTournaments] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const { width } = useWindowSize();
  const [duration, setDuration] = useState(0);
  const [startDay, setStartDay] = useState(0);
  const [startMonth, setStartMonth] = useState(0);
  const [startYear, setStartYear] = useState(0);
  const [endDay, setEndDay] = useState(0);
  const [endMonth, setEndMonth] = useState(0);
  const [endYear, setEndYear] = useState(0);
  const { USER } = useAuthContext();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { handleSubmit } = useForm();

  const [adminAddressWallet, setAdminAddressWallet] = useState('0x83d9C5d7...2F4D914D');
  const [walletAddress, setWalletAddress] = useState('');
  const [addressesMatch, setAddressesMatch] = useState(false);
  const [file, setFile] = useState();
  const [amount, setAmount] = useState(0);


  const [disableImage, setDisableImage] = useState(true);

  const [step, setStep] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [dataFromFirstPart, setDataFromFirstPart] = useState({});
  const [dataFromSecondPart, setDataFromSecondPart] = useState({});

  const [tournamentSelected, setTournamentSelected] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");


  const handleSaveFirstPartData = (data) => {
    setDataFromFirstPart(data);
  };
  const handleSaveSecondPartData = (data) => {
    setDataFromSecondPart(data);
  };
  const [userData, setUserData] = useState({
    userName: USER.fullname,
    userEmail: USER.email
  });
  const [paymentData, setPaymentData] = useState({
    walletAddress: '',
    amount: 0
  });

  const [openTermsDialog, setOpenTermsDialog] = useState(true);


  const saveUserData = (data) => {
    if (!tournamentId) {
      toast.error('Please select a tournament before proceeding.');
      return;
    }
    setUserData({
      ...data,
      tournamentId: tournamentId
    });
    nextStep();
  };
  const savePaymentData = (data) => {
    setPaymentData(data);
    //toast.success("Your payment has been processed successfully. !");

    handleConfirmation();
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  {/*useEffect(() => {
    if (addressesMatch) {
      setIsMatch(true);
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
    } else {
      setIsMatch(false);
    }
  }, [addressesMatch]);
*/}
  useEffect(() => {
    if (walletAddress && adminAddressWallet) {
      setAddressesMatch(walletAddress === adminAddressWallet);
    }
  }, [walletAddress, adminAddressWallet]);
  const handleChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setDisableImage(false);
      toast.success('Image uploaded successfully!');
    } else {
      setFile(null);
      setDisableImage(true);
    }


    Tesseract.recognize(
        file,
        'eng',
        { logger: (m) => console.log(m) }
    ).then(({ data: { text: extractedText } }) => {
      console.log('Extracted Text:', extractedText);

      const extractWalletAddresses = (text) => {
        //const regexFrom = /From:\s(0x[a-fA-F0-9]+¢[a-fA-F0-9]+)/;

        const regexFrom = /From\s(Ox[a-fA-F0-9]{8}\.\.\.[a-fA-F0-9]{9})/g;
        const regexTo = /To\s(0x[a-fA-F0-9]{8}\.\.\.[a-fA-F0-9]{8})/g;

        const matchesFrom = regexFrom.exec(text);
        const matchesTo = regexTo.exec(text);

        const senderAddress = matchesFrom && matchesFrom.length > 1 ? matchesFrom[1] : '';
        const receiverAddress = matchesTo && matchesTo.length > 1 ? matchesTo[1] : '';

        const amountRegex = /For\s(\d+)\s\(/;
        const amountMatch = text.match(amountRegex);
        const transactionAmount = amountMatch ? amountMatch[1] : '';

        return { senderAddress, receiverAddress, transactionAmount };
      };

      const { senderAddress, receiverAddress, transactionAmount } = extractWalletAddresses(extractedText);

      console.log('Sender Address:', senderAddress);
      console.log('USER Address:', USER.addressWallet);

      console.log('admin Address:', adminAddressWallet);
      console.log('Receiver Address:', receiverAddress);

      console.log('Transaction Amount:', transactionAmount);

      setWalletAddress(senderAddress);
      setAmount(transactionAmount);
      const modifiedAddress = "O" + USER.addressWallet.slice(1);
      console.log('modified Address :', modifiedAddress);

      if (receiverAddress === adminAddressWallet && senderAddress === modifiedAddress) {
        console.log("match",addressesMatch)

        setAddressesMatch(true);
        console.log("matchhh",addressesMatch)

      } else {

        setAddressesMatch(false);
        console.log("match no  ",addressesMatch)
      }


    }).catch(error => {
      console.error('Error during OCR:', error);
    });
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
        const userId = userResponse.data._id;
        setUserId(userId);


        const response = await axios.get(`http://localhost:3000/Tournament/getByUserId/${userId}`);

        const data = response.data && response.data.tournaments ? response.data.tournaments : [];
        console.log("tournament :",data)

        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error.message);
      }
    };

    if (USER && USER.email) {
      fetchTournaments();
    }
  }, [USER]);

  const handleConfirmation = async () => {
    try {

      const selectedTournamentData = tournaments.find(tournament => tournament._id === tournamentId);
      const TournamentType = selectedTournamentData ? selectedTournamentData.tournamentType : null;


      console.log("tournament Type :",TournamentType)
      let expectedAmount;
      switch (TournamentType) {
        case 'Knockout':
          expectedAmount = '19';
          break;
        case 'League':
          expectedAmount = '6';
          break;
        case 'Championship':
          expectedAmount = '5';
          break;
        default:
          expectedAmount = '';
      }


      if (amount !== expectedAmount) {
        toast.error(` Incorrect amount for tournament type ${TournamentType}. Expected: ${expectedAmount}`);
        return;
      }

      const formData = {
        userId: userId,
        ...paymentData,
        tournament: tournamentId,
        payment_status: 'unpaid',
        amount: amount,
      };

      const response = await axios.post('http://localhost:3000/Payment/createPayment', formData);

      console.log("data cc:",formData)

      const aaddressesMatch = response.data && response.data.addressesMatch ? response.data.addressesMatch : false;

      console.log("data dddd:", aaddressesMatch);

      const payment = response.data && response.data.payment ? response.data.payment : null;
      console.log("payment dddd:", payment);

      if (addressesMatch && payment) {
        await axios.put(`http://localhost:3000/Payment/${payment._id}`, { payment_status: 'paid' });
        toast.success("Your payment has been processed successfully!");
        navigate('/payment/checkout-success');



        console.log("payment dddd:", payment);

      }else {
        toast.error("User and Admin wallet addresses do not match!");

      }

    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };


  const onSubmit = (data) => {
    //toast.info("Your details have been successfully saved! Please proceed with the payment process.");
  };

  const handleTournamentChange = (selectedTournament) => {
    setTournamentId(selectedTournament);
    const selectedTournamentData = tournaments.find(tournament => tournament._id === selectedTournament);

    if (selectedTournamentData) {
      setTitle(selectedTournamentData.title);
      setStartDay(selectedTournamentData.startDay);
      setStartMonth(selectedTournamentData.startMonth);
      setStartYear(selectedTournamentData.startYear);
      setEndDay(selectedTournamentData.endDay);
      setEndMonth(selectedTournamentData.endMonth);
      setEndYear(selectedTournamentData.endYear);

      const start = new Date(selectedTournamentData.startYear, selectedTournamentData.startMonth - 1, selectedTournamentData.startDay);
      const end = new Date(selectedTournamentData.endYear, selectedTournamentData.endMonth - 1, selectedTournamentData.endDay);

      setStartDate({
        day: start.getDate(),
        month: start.getMonth() + 1,
        year: start.getFullYear(),
      });

      setEndDate({
        day: end.getDate(),
        month: end.getMonth() + 1,
        year: end.getFullYear(),
      });

      const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setDuration(durationInDays);
    }
  };
  return (
      <form className="d-flex flex-column g-20" onSubmit={handleSubmit(onSubmit)}>
        <Spring className="card d-flex flex-column card-padded">
          <div className="d-flex flex-column justify-content-between flex-1">
            <Tabs
                style={{ width: '100%', backgroundColor: '#FDCA40', color: 'black', justifyContent: 'center' }}
            >
              <h3 style={{ paddingTop: '10px', marginLeft: '250px', color: 'black' }}>Payment with GSCoin</h3>
            </Tabs>

            <br></br>

            {step === 1 && (
                <div>
                  <label>
                    User Name
                    <input
                        className={classNames('field text-700')}
                        type="text"
                        placeholder="Name"
                        disabled={true}
                        value={USER.fullname}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                  </label>
                  <label>
                    User Email
                    <input
                        className={classNames('field text-700')}
                        type="text"
                        placeholder="Name"
                        disabled={true}
                        value={USER.email}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                  </label>
                  <br />
                  <hr style={{ margin: '20px 0' }} />
                  {tournamentId  ? (
                      <>
                        <label>
                          Tournament Title:
                          <input
                              className={classNames('field text-700')}
                              type="text"
                              value={title}
                              readOnly
                          />
                        </label>
                        <label>
                          Tournament Start Data:
                          <input
                              className={classNames('field text-700')}
                              type="text"
                              value={startDate && `${startDate.day}/${startDate.month}/${startDate.year}`}
                              readOnly
                          />
                        </label>
                        <label>
                          Tournament End Data:
                          <input
                              className={classNames('field text-700')}
                              type="text"
                              value={endDate && `${endDate.day}/${endDate.month}/${endDate.year}`}
                              readOnly
                          />
                        </label>

                        <label>
                          Tournament Duration:
                          <input
                              className={classNames('field text-700')}
                              type="text"
                              value={duration}
                              readOnly
                          />
                        </label>
                        <button
                            className="btn"
                            type="button"
                            style={{ marginLeft: '150px', width: '60%', backgroundColor: 'red', color: 'white' }}
                            onClick={() => {
                              setTournamentId('');
                              setTitle('');
                              setStartDay(0);
                              setStartMonth(0);
                              setStartYear(0);
                              setEndDay(0);
                              setEndMonth(0);
                              setEndYear(0);
                              setStartDate(null);
                              setEndDate(null);
                              setDuration(0);
                              setTournamentSelected(false);
                            }}
                        >
                          Cancel Selection
                        </button>
                        <hr style={{ margin: '20px 0' }} />

                      </>
                  ) : (
                      <>
                        <label>
                          Tournament Title:
                          <CustomSelect
                              className="custom-select"
                              options={(tournaments || []).map(tournament => ({
                                label: tournament.title,
                                value: tournament._id,
                              }))}
                              value={{ label: tournamentId, value: tournamentId }}
                              onChange={(selectedOption) => {
                                handleTournamentChange(selectedOption.value);
                                setTournamentSelected(true);
                              }}
                          />
                        </label>
                        {tournamentSelected ? null : (
                            <p style={{ color: 'red', marginLeft: '10px' }}>Please select a tournament.</p>
                        )}
                      </>
                  )}


                </div>



            )}
            {step === 2 && (
                <div>
                  <label>
                    User Address Wallet
                    <input
                        className={classNames('field text-700')}
                        type="text"
                        placeholder="AddressWallet"
                        disabled={true}
                        value={USER.addressWallet}
                    />
                  </label>

                  <div style={{ marginBottom: '20px', textAlign: 'center' }} className="transaction-screenshot">
                    {!file && (
                        <label htmlFor="transaction-image" style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }} className="transaction-screenshot-label">
                          <p style={{ display: 'block', margin: '10px auto', padding: '8px 12px', backgroundColor: '#FDCA40', color: 'black', border: 'none', borderRadius: '9px', cursor: 'pointer' }}>
                            Upload Screenshot for Your Transaction
                            <input
                              id="transaction-image"
                              style={{ display: 'none' }}
                              className="transaction-screenshot-input"
                              type="file"
                              onChange={handleChange}
                          />
                      </p><MdScreenshotMonitor style={{  width: '5%', height: '5%',margin: '0 auto' }} />
                        </label>
                    )}
                    {!disableImage && (
                        <div style={{ border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden', width: '100%', maxWidth: '700px', margin: '0 auto' }} className="transaction-screenshot-preview">
                          <img src={file} alt="Transaction Screenshot" style={{ display: 'block', width: '100%', height: 'auto' }} className="transaction-screenshot-image" />
                          <button style={{ display: 'block', margin: '10px auto', padding: '8px 16px', backgroundColor: '#FDCA40', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setFile(null)}>Remove Image</button>
                        </div>
                    )}
                  </div>



                  {!disableImage && (
                      <div>
                        {addressesMatch ? (
                            <b className={showAnimation ? "animate-fade" : ""} style={{ marginLeft: '180px', paddingTop: '30px', color: 'green' }}>
                              User and Admin wallet addresses match! <FaCheckCircle style={{ color: 'green' }} />
                            </b>
                        ) : (
                            <b style={{ marginLeft: '180px', paddingTop: '30px', color: 'red' }}>
                              User and Admin wallet addresses do not match! <FaTimesCircle style={{ color: 'red' }} />
                            </b>
                        )}
                      </div>
                  )}
                  <label>
                    Amount with GSC
                    <input
                        className={classNames('field text-700')}
                        type="text"
                        placeholder="Amount"
                        disabled={true}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                  </label>



                </div>
            )}
            <br />
            {step === 1 && (
                <button
                    className="btn"
                    type="button"
                    style={{ marginLeft: '150px', width: '60%', backgroundColor: '#FDCA40', color: 'black' }}
                    onClick={() => saveUserData(dataFromFirstPart)}

                >
                  Next
                </button>

            )}
            <br /><br />
            <button
                className="btn"
                type="button"
                style={{  width: '100%', backgroundColor: 'transparent', color: 'white' }}
                onClick={() => setOpenTermsDialog(true)}
            >
              <u>View the Terms & Conditions before completing your payment with GSCoin or Stripe.</u>
            </button>
            <Dialog open={openTermsDialog} onClose={() => setOpenTermsDialog(false)}>
              <DialogTitle>Terms & Conditions</DialogTitle>
              <DialogContent>
                <div   style={{  marginLeft:'20%',marginBottom:'5%',width: '100%',fontWeight:'bold',fontSize:'20px', color: 'red' }}>
                  <b>Here are the terms and conditions</b>
                </div>


                <ul>
                  <li> <b style={{  fontWeight:'bold',fontSize:'14px', color: 'blue' }}>Term 1 :</b>  Every tournament has a different amount. If your tournament is a <b>league</b>, you must pay <b>50 TND</b>. If your tournament is a <b>knockout</b>, you should pay  <b>30 TND.</b> If the tournament is a <b>Championship,</b> you need to pay <b>40 TND</b>.
                  </li>
                  <li><b style={{  fontWeight:'bold',fontSize:'14px', color: 'blue' }}>Term 2 :</b>  The amount may vary depending on the duration of the tournament. <b>The first two days are free</b>, and after these two days, each additional <b>day costs 2 TND</b>. <u>For example, if the tournament duration is 6 days, the amount would be ((6-2) * 2).</u>
                  </li>
                  <li><b style={{  fontWeight:'bold',fontSize:'14px', color: 'blue' }}>Term 3 :</b>    If you want to pay with Coin, <br />
                    <b>I - </b>  first go to this link <a style={{  fontWeight:'bold',fontSize:'13px', color: 'green' }} href="https://garksportscoin.netlify.app/" target="_blank" rel="noopener noreferrer">https://garksportscoin.netlify.app/</a> . <br />
                    <b>II - </b>  connect with your Metamask wallet. <br />
                    <b> III -</b> Navigate to the 'Send Token' section and ensure you send the token to this wallet address: <b style={{color:'green'}}>0x83d9C5d7DfD1D2f5BeD9aDb3bf187e52F4D914DF</b>.<br/>
                    <b><u>If you don't have the token, you can buy a Coin or pay with Stripe.</u></b><br />
                    <b> IV -</b> After successfully completing your transaction with Coin, you should go to <a style={{  fontWeight:'bold',fontSize:'13px', color: 'green' }}  href="https://bscscan.com/" target="_blank" rel="noopener noreferrer">https://bscscan.com/</a> <br/>
                    <b> V -</b> Take a screenshot of your payment transaction.<br/>
                    <img src={imagetransaction} alt="Transaction Screenshot" style={{ display: 'block', width: '100%', border: '2px solid black', height: 'auto' }} className="transaction-screenshot-image" />
                    <b>VI -</b>  Once you've done that, you can continue with your payment like this one.<br/><br/>
                    <p>Every tournament has a different amount in GSC: <br/>
                      ** If your tournament is a <b>league</b>, you must pay <b>6 GSC</b>.<br/>
                      ** If your tournament is a <b>knockout</b>, you should pay  <b>19 GSC.</b><br/>
                      ** If the tournament is a <b>Championship,</b> you need to pay <b>5 GSC</b></p>
                    <p style={{ fontSize:'11px', color: 'blue' }}>The amount does not depend on the duration of the tournament when paying with GSCoin.</p>
                    <br/>
                    <p><u>If you need any support, you can contact us <a  href="https://gmail.com/"><b>LinkUpTournament@gmail.com</b></a> </u></p><br/>

                  </li>
                </ul>
              </DialogContent>
              <DialogActions>
                <Button  style={{  width: '100%', backgroundColor: 'green', color: 'white' }} onClick={() => setOpenTermsDialog(false)}>CONFIRM</Button>
              </DialogActions>
            </Dialog>


            <br /><br />
            {step === 2 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button
                      className="btn"
                      type="button"
                      style={{ marginRight: '10px', width: '30%', backgroundColor: '#FDCA40', color: 'black' }}
                      onClick={prevStep}
                  >
                    <IoMdArrowRoundBack   style={{  width: '11%',height:'100%' }}/>

                    Back
                  </button>
                  <button
                      className="btn"
                      type="submit"
                      style={{ marginLeft: '10px', width: '30%', backgroundColor: '#FDCA40', color: 'black' }}
                      onClick={() => savePaymentData(dataFromSecondPart)}
                      disabled={disableImage || !amount}
                  >
                    Confirmation
                  </button>
                </div>
            )}

          </div>
        </Spring>
      </form>
  );
};

export default App;


