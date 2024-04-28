    // GA
    import ReactGA from 'react-ga4';
    // utils
    import {lazy, Suspense} from 'react';

    // styles
    import ThemeStyles from '@styles/theme';
    import './style.scss';
    
    
    // libs styles
    import 'react-toastify/dist/ReactToastify.min.css';
    import 'react-grid-layout/css/styles.css';
    import 'swiper/css';
    import 'swiper/css/effect-fade';
    import 'swiper/css/pagination';

  

    // fonts
    import '@fonts/icomoon/icomoon.woff';

    // contexts
    import {SidebarProvider} from '@contexts/sidebarContext';
    import {ThemeProvider} from 'styled-components';

    // hooks
    import {useThemeProvider} from '@contexts/themeContext';
    import {useEffect, useRef} from 'react';
    import {useWindowSize} from 'react-use';
    import useAuthRoute from '@hooks/useAuthRoute';

    // utils
    import {StyleSheetManager} from 'styled-components';
    import {ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles';
    import {preventDefault} from '@utils/helpers';
    import rtlPlugin from 'stylis-plugin-rtl';
    import {CacheProvider} from '@emotion/react';
    import createCache from '@emotion/cache';
    import Profile from "@pages/User/Profile";
    import Home from "@pages/Home/Home";
    // components
    import {Route, Routes} from 'react-router-dom';
    import {ToastContainer} from 'react-toastify';
    import LoadingScreen from '@components/LoadingScreen';
    import Sidebar from '@layout/Sidebar';
    import BottomNav from '@layout/BottomNav';
    import Navbar from '@layout/Navbar';
    import ShoppingCart from '@widgets/NotificationCart';

    import ScrollToTop from '@components/ScrollToTop';
    import MatchResult from '@pages/Results/MatchResult';
    import AgentScore from '@pages/Results/AgentScore';
    import RequireAuth from "@components/ProtectedRoute/RequireAuth";
    import Role from "@utils/Role";
    import UserManagement from "@pages/Admin/UserManagement";
    import Chat from "@pages/Chat/Chat";
    import ClubSummary from "@pages/ClubSummary";
    import MyTournaments from "@pages/Player/MyTournaments";
    import RoleRequests from "@pages/Admin/RoleRequests";
    import ChatBot from '@components/Chatbot/Chatbot';
    import LiveStream from "@pages/LiveStreaming/LiveStreaming";
    import WatchStream from "@pages/LiveStreaming/WatchLiveStream";
    // import MyTournamentsSelectorFrontDisplay from "@pages/Player/MyTournaments";

    // pages
   
    // const ClubSummary = lazy(() => import('@pages/ClubSummary'));
    const GameSummary = lazy(() => import('@pages/GameSummary'));
    const Championships = lazy(() => import('@pages/Championships'));

    const LeagueOverview = lazy(() => import('@pages/LeagueOverview'));
    const FansCommunity = lazy(() => import('@pages/FansCommunity'));
    const Statistics = lazy(() => import('@pages/Statistics'));
    const PageNotFound = lazy(() => import('@pages/PageNotFound'));
    const Unauthorized = lazy(() => import('@pages/Unauthorized'));
    const MatchSummary = lazy(() => import('@pages/MatchSummary'));
    
    const PlayerProfile = lazy(() => import('@pages/PlayerProfile'));
    const Schedule = lazy(() => import('@pages/Schedule'));
    const Tickets = lazy(() => import('@pages/Tickets'));
    const FootballStore = lazy(() => import('@pages/FootballStore'));
    const BrandStore = lazy(() => import('@pages/BrandStore'));
    const Product = lazy(() => import('@pages/Product'));
    const Login = lazy(() => import('@pages/Login'));
    const SignUp = lazy(() => import('@pages/SignUp'));
    const Settings = lazy(() => import('@pages/Settings'));
    //Tournament
    const Tournaments = lazy(() => import('@pages/Tournament/TournamentList'));
    const AddTeams = lazy(() =>import ('@pages/Tournament/AddTeams'))
    const TournamentCreated = lazy(() => import('@pages/Tournament/TournamentCreated')); 
    const CreateTournament = lazy(() => import('@pages/Tournament/CreateTournament'));
    const KnockTournamentBuild = lazy(() => import('@pages/Tournament/KnockoutTournamentBuild'));
    const TournamentReview = lazy(()=> import('@pages/Tournament/TournamentReview'))
    const LeagueInformationsBackOffice = lazy(() => import('@pages/Tournament/LeagueInformationsBackOffice'));
    const LeaguesDisplay = lazy(()=> import('@pages/Tournament/LeagueDisplay'));
    const FantasyHome = lazy(() => import('@pages/Tournament/FantasyHome'))
    const WorldWide = lazy(() =>import('@pages/Tournament/WorldWide'));
    // Refree Routes
   // const Complaints = lazy(() => import('@pages/Admin/Complaints'));
    const RealTime = lazy(() => import('@pages/Refree/RealTime'));
    const MatchList = lazy(() => import('@pages/Refree/MatchList'));
    const Test = lazy(() => import('@pages/Refree/Test'));

// Admin Routes
    const Organizer = lazy(() => import('@pages/Admin/Organizer'));
    const Coach = lazy(() => import('@pages/Admin/Coach'));
    const Referee = lazy(() => import('@pages/Admin/Referee'));
    const Player = lazy(() => import('@pages/Admin/Player'));
    const Team = lazy(() => import('@pages/Admin/Team'));
    const Complaints = lazy(() => import('@pages/Admin/Complaints'));
    const TournamentList = lazy(() =>import('@pages/Admin/TournamentsManagement'))

    // Payment Routes
    const PaymentAdmin = lazy(() => import('@pages/Payment/PamyentAdmin'));
    const PaymentOrganizer = lazy(() => import('@pages/Payment/PaymentOrganizer'));
    const PaymentWithCoin = lazy(() => import('@pages/Payment/PaymentWithCoin'));

    const PaymentSucess = lazy(() => import('@pages/Payment/SuccessPayment'));
    const CancelPayment = lazy(() => import('@pages/Payment/CancelPayment'));

    // Team Routes

    const CreateTeam = lazy(() => import('@pages/Team/CreateTeam'));
    const TeamList = lazy(() => import('@pages/Team/TeamList'));
    const TeamLineupF = lazy(() => import('@pages/Coach/TeamLineupF'));

    // Complaint Routes

    const Complaint = lazy(() => import('@pages/Complaint/Complaint'));
    const AboutUs = lazy(() => import('@pages/Complaint/AboutUs'));


const AddNewPlayer = lazy(() => import('@pages/Coach/AddPlayer'));
const LineUp = lazy(() => import('@pages/Coach/LineUp'));
const LineupTeam = lazy(() => import('@pages/Coach/lineupTeam'));
const TeamProfile = lazy(() => import('@pages/Team/TeamProfile'));
const CoachProfile = lazy(() => import('@pages/CoachProfile'));






    const App = () => {

        const appRef = useRef(null);
        const {theme, direction} = useThemeProvider();
        const {width} = useWindowSize();
        const isAuthRoute = useAuthRoute();

        // Google Analytics init
        const gaKey = process.env.REACT_APP_PUBLIC_GA;
        gaKey && ReactGA.initialize(gaKey);

        // auto RTL support for Material-UI components and styled-components

        const plugins = direction === 'rtl' ? [rtlPlugin] : [];

        const muiTheme = createTheme({
            direction: direction,
        });

        const cacheRtl = createCache({
            key: 'css-rtl',
            stylisPlugins: plugins,
        });

        useEffect(() => {
            // scroll to top on route change
            appRef.current && appRef.current.scrollTo(0, 0);

            preventDefault();
        }, []);

        return (
            <CacheProvider value={cacheRtl}>
                <MuiThemeProvider theme={muiTheme}>
                    <SidebarProvider>
                        <ThemeProvider theme={{ theme: theme }}>
                            <ThemeStyles />
                            <ChatBot />
                            <ToastContainer theme={theme} autoClose={2500} position={direction === 'ltr' ? 'top-right' : 'top-left'} />
                            <StyleSheetManager stylisPlugins={plugins}>
                                <div className={`app ${isAuthRoute ? 'fluid' : ''}`} ref={appRef}>
                                    <ScrollToTop />
                                    {!isAuthRoute && (
                                        <>
                                            <Sidebar />
                                            {width < 768 && <Navbar />}
                                            {width < 768 && <BottomNav />}
                                        </>
                                    )}
                                    <div className="app_container">
                                        <div className="app_container-content d-flex flex-column flex-1">
                                            <Suspense fallback={<LoadingScreen />}>
                                                <Routes>

                                                    <Route path="*" element={<PageNotFound/>}/>
                                                    {/*<Route path="/" element={<ClubSummary/>}/>*/}
                                                    <Route path="/" element={<Home/>}/>
                                                    <Route path="/unauthorized" element={<Unauthorized/>}/>
                                                    <Route path="/game-summary" element={<GameSummary/>}/>
                                                    <Route path="/championships" element={<Championships/>}/>
                                                    <Route path="/league-overview" element={<LeagueOverview/>}/>
                                                    <Route path="/fans-community" element={<FansCommunity/>}/>
                                                    <Route path="/statistics" element={<Statistics/>}/>
                                                    <Route path="/match-summary" element={<MatchSummary/>}/>
                                                    <Route path="/player-profile" element={<PlayerProfile/>}/>
                                                    <Route path="/schedule" element={<Schedule/>}/>
                                                    <Route path="/tickets" element={<Tickets/>}/>
                                                    <Route path="/football-store" element={<FootballStore/>}/>
                                                    <Route path="/brand-store" element={<BrandStore/>}/>
                                                    <Route path="/product" element={<Product/>}/>
                                                    <Route path="/login" element={<Login/>}/>
                                                    <Route path="/sign-up" element={<SignUp/>}/>
                                                    <Route path="/settings" element={<Settings/>}/>
                                                
                                                    <Route path="/addTeams" element={<AddTeams/>}/>
                                                    <Route path="/realtime" element={<RealTime/>}/>
                                                    <Route path="/match-list" element={<MatchList/>}/>
                                                    <Route path="/complaint" element={<Complaint/>}/>
                                                    <Route path="/test" element={<Test/>}/>

                                                    //Tournaments Routes
                                                    <Route path="/tournament-list" element={<Tournaments/>}/>
                                                    <Route path="/create-tournament" element={<CreateTournament/>}/>
                                                    <Route path="/LeaguesBackOffice" element={<LeagueInformationsBackOffice/>}/>

                                                    //Fantasy Routes
                                                    <Route path='/WorldWide' element={<WorldWide/>}/>

                                                    //page affichier lors de la creation du tournoi
                                                    <Route path="/TournamentCreated" element={<TournamentCreated/>}/>

                                                    //page vide
                                                    <Route path="/KnockoutTournamentBuild" element={<KnockTournamentBuild/>}/>

                                                    <Route path="/addTeams" element={<AddTeams/>}/>
                                                    <Route path='/TournamentReview' element={<TournamentReview/>}/>
                                                    <Route path='/LeaguesDisplay' element={<LeaguesDisplay/>}/>
                                                    <Route path='/Tournament-Admin' element={<TournamentList/>} />
                                                    <Route path="/Fantasy" element={<FantasyHome/>}/>


                                                    // Admin Tournament Routes
                                                    {/* <Route path='/TournamentAdmin' element={<TournamentList/>} />*/}

                                                    //Chat route
                                                    <Route element={<RequireAuth allowedRoles={[Role.USER]}/> }>
                                                    <Route path="/chat" element={<Chat/>}/>
                                                    </Route>

                                                    //Result Routes
                                                    {/* <Route path="/match/:id" element={<MatchResult/>}/>
                                                    <Route path="/agent/:id" element={<AgentScore/>}/> */}

                                                    <Route path="/match" element={<MatchResult/>}/>
                                                    <Route path="/agent/:id" element={<AgentScore/>}/>

                                                    <Route path="/users" element={<UserManagement/>}/>

                                                    
                                                    <Route element={<RequireAuth allowedRoles={[Role.ADMIN]} />}>

                                                    // Admin Routes
                                                    <Route path="/organizer-list" element={<Organizer/>}/>
                                                        <Route path="/coach-list" element={<Coach/>}/>
                                                    <Route path="/refree-list" element={<Referee/>}/>
                                                    <Route path="/player-list" element={<Player/>}/>
                                                    <Route path="/team-list" element={<Team/>}/>
                                                    <Route path="/complaint-list" element={<Complaints/>}/>
                                                    <Route path="/user-management" element={<UserManagement/>}/>
                                                    <Route path="/role-requests" element={<RoleRequests/>}/>
                                                        <Route path='/TournamentAdmin' element={<TournamentList/>} />


                                                    </Route>

                                                    // Payment Routes
                                                    <Route path="/payment-list" element={<PaymentAdmin/>}/>
                                                    <Route path="/payment-stripe" element={<PaymentOrganizer/>}/>
                                                    <Route path="/payment-coin" element={<PaymentWithCoin/>}/>
                                                    <Route path="/payment/checkout-success" element={<PaymentSucess/>}/>
                                                    <Route path="/payment/checkout-cancel" element={<CancelPayment/>}/>


                                                    // Team Routes
                                                    <Route path="/create-team" element={<CreateTeam/>}/>
                                                    <Route path="/team-list" element={<TeamList/>}/>
                                                    <Route path="/add-new-player" element={<AddNewPlayer/>}/>
                                                    <Route path="/team-Profile" element={<TeamProfile/>}/>
                                                    <Route path="/player-profile/:playerId" element={<PlayerProfile />} />

                                                    // Coach
                                                    <Route path="/lineup" element={<LineUp/>}/>
                                                    <Route path="/lineupTeam" element={<LineupTeam/>}/>
                                                    <Route path="/coach-profile" element={<CoachProfile />} />

                                                    // Complaint Routes
                                                    <Route path="/complaint" element={<Complaint/>}/>
                                                    <Route path="/about-us" element={<AboutUs/>}/>

                                                    //Player routes
                                                    <Route element={<RequireAuth allowedRoles={[Role.PLAYER,Role.TEAM_MANAGER,Role.COACH]}/> }>
                                                        <Route path="/my-tournaments" element={<MyTournaments/>}/>
                                                    </Route>

                                                    // User routes
                                                    <Route element={<RequireAuth allowedRoles={[Role.USER]}/>}>
                                                    <Route path="/profile" element={<Profile/>}/>
                                                    </Route>
                                                    <Route element={<RequireAuth allowedRoles={[Role.COACH]}/>}>
                                                        <Route path="/TeamLineupF" element={<TeamLineupF/>}/>
                                                    </Route>
                                                    //Live Streaming
                                                    <Route element={<RequireAuth allowedRoles={[Role.USER]}/> }>
                                                        <Route path="/live" element={<LiveStream/>}/>
                                                        <Route path="/watch" element={<WatchStream/>}/>
                                                    </Route>
                                                </Routes>
                                        </Suspense>
                                    </div>
                                </div>
                                <ShoppingCart isPopup />
                            </div>
                        </StyleSheetManager>
                    </ThemeProvider>
                </SidebarProvider>
            </MuiThemeProvider>
        </CacheProvider>
    );
}

    export default App
