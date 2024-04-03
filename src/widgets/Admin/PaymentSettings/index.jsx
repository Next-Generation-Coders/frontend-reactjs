import React, { useState, useEffect } from "react";
import Spring from '@components/Spring';
import { useWindowSize } from 'react-use';
import CustomSelect from '@ui/CustomSelect';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tabs} from '@mui/material';
import {useAuthContext} from "@hooks/useAuthContext";
import axios from "axios";
import classNames from "classnames";
import imagetransaction from "@assets/fans/transactionimage.png";


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
  const [openTermsDialog, setOpenTermsDialog] = useState(true);
  const [tournamentSelected, setTournamentSelected] = useState(false);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
        const userId = userResponse.data._id;
        console.log(userId);

        const response = await axios.get(`http://localhost:3000/Tournament/getByUserId/${userId}`);

        const data = response.data && response.data.tournaments ? response.data.tournaments : [];
        console.log(data);

        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error.message);
      }
    };

    if (USER && USER.email) {
      fetchTournaments();
    }
  }, [USER]);


  console.log("email user",USER.email)

  const handleCheckout = async () => {
    try {
      const userResponse = await axios.get(`http://localhost:3000/User/getbyemail?email=${USER.email}`);
      const userIdentif = userResponse.data._id;
      console.log(userIdentif);

      const response = await fetch("http://localhost:3000/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdentif,
          tournamentId: tournamentId,
          items: [
            {
              title: title,
            },
          ],
        }),
      });

      if (!response.ok) {
        console.error("Server error:", response.statusText);
        return;
      }

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  const onSubmit = (data) => {
    toast.info("Your details have been successfully saved! Please proceed with the payment process.");
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
              <h3 style={{ paddingTop: '10px', marginLeft: '270px', color: 'black' }}>Payment with Stripe</h3>
            </Tabs>

            <br></br>

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

              <br /><br />
            </div>



            <button
                className="btn"
                type="submit"
                style={{ marginLeft: '150px', width: '60%', backgroundColor: '#FDCA40', color: 'black' }}
                onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

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
                    <p><u>If you need any support, you can contact us.<a  href="https://gmail.com/"><b>LinkUpTournament@gmail.com</b></a> </u></p><br/>

                  </li>
                </ul>
              </DialogContent>
              <DialogActions>
                <Button  style={{  width: '100%', backgroundColor: 'green', color: 'white' }} onClick={() => setOpenTermsDialog(false)}>CONFIRM</Button>
              </DialogActions>
            </Dialog>

          </div>
        </Spring>
      </form>
  );
};

export default App;


