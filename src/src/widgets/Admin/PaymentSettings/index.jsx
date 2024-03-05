import React, { useState, useEffect } from "react";
import Spring from '@components/Spring';
import { useWindowSize } from 'react-use';
import CustomSelect from '@ui/CustomSelect';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Tabs } from '@mui/material';


const App = () => {
  const [userId, setUserId] = useState("65da0cb23917a5e0dd33f202");
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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);



  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch("http://localhost:3000/Tournament/getall");

        if (!response.ok) {
          console.error("Server error:", response.statusText);
          return;
        }

        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error.message);
      }
    };

    fetchTournaments();
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3000/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
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
            <h3 style={{ paddingTop: '10px', marginLeft: '320px', color: 'black' }}>Payment</h3>
          </Tabs>

          <br></br>

          <div>
            <label>
              User ID:(user name organizer connected )
              <input
                 style={{ width: '100%', border: '1px solid white', padding: '10px' }}
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </label>
            <br />
            

           
            <hr style={{ margin: '20px 0' }} />

            {tournamentId ? (
              <>
                <label>
                  Tournament Title:
                  <input
                    style={{ width: '100%', border: '1px solid white', padding: '10px' }}
                    type="text"
                    value={title}
                    readOnly
                  />
                </label>
                <label>
                  Tournament Start Data:
                  <input
                    style={{ width: '100%', border: '1px solid white', padding: '10px' }}
                    type="text"
                    value={startDate && `${startDate.day}/${startDate.month}/${startDate.year}`}
                    readOnly
                  />
                </label>
                <label>
                  Tournament End Data:
                  <input
                    style={{ width: '100%', border: '1px solid white', padding: '10px' }}
                    type="text"
                    value={endDate && `${endDate.day}/${endDate.month}/${endDate.year}`}
                    readOnly
                  />
                </label>

                <label>
                  Tournament Duration:
                  <input
                    style={{ width: '100%', border: '1px solid white', padding: '10px' }}
                    type="text"
                    value={duration}
                    readOnly
                  />
                </label>
              </>
            ) : (
              <label>
                Tournament Title:
                <CustomSelect
                  className="custom-select"
                  options={tournaments.map(tournament => ({
                    label: tournament.title,
                    value: tournament._id,
                  }))}
                  value={{ label: tournamentId, value: tournamentId }}
                  onChange={(selectedOption) => handleTournamentChange(selectedOption.value)}
                />
              </label>
            )}

            <br /><br /><br />
          </div>

          <button
            className="btn"
            type="submit"
            style={{ marginLeft: '150px', width: '60%', backgroundColor: '#FDCA40', color: 'black' }}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </Spring>
    </form>
  );
};

export default App;


