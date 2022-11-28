import {Route, Routes} from "react-router-dom";
import Layout from "./hoc/Layout";
import React from 'react';
import Login from "./pages/account/Login";
import GuestRoute from "./hoc/GuestRoute";
import Signup from "./pages/account/Signup";
import Activate from "./pages/account/Activate";
import SubredditContainer from "./containers/SubredditContainer";
import CreatePostContainer from "./containers/CreatePostContainer";
import PostListContainer from "./containers/PostListContainer";
import PostDetailContainer from "./containers/PostDetailContainer";
import CreateSubredditContainer from "./containers/CreateSubredditContainer";
import SearchResultsContainer from "./containers/SearchResultsContainer";
import UserProfileContainer from "./containers/UserProfileContainer";
// import Signup from "./containers/Signup";
import DummyLusiContainer from "./containers/DummyLusiContainer";
import * as urls from "./urls";
import PrivateRoute from "./hoc/PrivateRoute";
import ResetopasuContainer from "./containers/ResetopasuContainer";
import ResetokakuninContainer from "./containers/ResetokakuninContainer";
import Resendo from "./pages/account/Resendo";
import PxulwListContainer from "./containers/PxulwListContainer";
import {CookieConsent} from "react-cookie-consent";

function App() {

    return (
        <>
            <Layout>
                <div className="main-layout">

                    <Routes>
                        <Route
                            exact
                            path="/password/reset/confirm/:uid/:token"
                            element={<ResetokakuninContainer/>}
                        />
                        <Route
                            exact
                            path="/reset-password"
                            element={
                                <ResetopasuContainer/>
                            }
                        />

                        {/*<Route exact path='/' element={<GuestRoute><home/></GuestRoute>}/>*/}
                        <Route exact path='/login' element={<GuestRoute><Login/></GuestRoute>}/>
                        <Route exact path='/resend-activation' element={<GuestRoute><Resendo/></GuestRoute>}/>
                        <Route exact path='/signup' element={<GuestRoute><Signup/></GuestRoute>}/>
                        {/*<Route exact path='/reset-password' element={<GuestRoute><ResetPassword/></GuestRoute>}/>*/}
                        <Route exact path='/activate/:uid/:token' element={<GuestRoute><Activate/></GuestRoute>}/>
                        <Route
                            exact
                            path="/r/:subredditTitle/:create-post"
                            element={<PrivateRoute>
                                <SubredditContainer
                                    primaryComponent={props => (
                                        <CreatePostContainer {...props} />
                                    )}
                                /></PrivateRoute>
                            }
                        />
                        <Route
                            exact
                            path="/r/:subredditTitle/post-detail/:postId"
                            element={<SubredditContainer primaryComponent={props => (
                                <PostDetailContainer {...props} />
                            )}
                            />}
                        />
                        {/* Go directly to comments but otherwise same as postDetail */}
                        <Route
                            exact
                            path="/r/:subredditTitle/post-detail/:postId/comments"
                            element={
                                <SubredditContainer
                                    primaryComponent={props => (
                                        <PostDetailContainer {...props} commentScroll/>
                                    )}
                                />
                            }
                        />
                        <Route
                            exact
                            path="/r/:subredditTitle"
                            element={
                                <SubredditContainer
                                    primaryComponent={props => <PostListContainer {...props} />}
                                    showSortByNavBar
                                />
                            }
                        />
                        <Route
                            path="/posts/user-list/:username" element={<PxulwListContainer/>}
                        />


                        <Route
                            exact
                            path="/create-topic"
                            element={<PrivateRoute>
                                <CreateSubredditContainer
                                /></PrivateRoute>
                            }
                        />
                        <Route
                            exact
                            path="/dummylusi"
                            element={
                                <DummyLusiContainer
                                />
                            }
                        />
                        <Route
                            path={urls.SEARCH_URL}
                            element={
                                <SearchResultsContainer/>
                            }
                        />
                        {/* The 'home' psuedo-subreddit */}
                        <Route
                            exact
                            path="/"
                            element={

                                <SubredditContainer
                                    primaryComponent={props => <PostListContainer {...props} />}
                                    showSortByNavBar
                                />

                            }
                        />
                        {/* A user's profile */}
                        <Route
                            path="/profile/:username" element={<UserProfileContainer/>}
                        />

                    </Routes>
                </div>
                <CookieConsent location="bottom" buttonText="OK" cookieName="cookieConsent"
                               style={{background: "#212529"}} buttonStyle={{color: "#1a1a1a", fontSize: "13px", background: "#ffd43e"}}
                               expires={150}> This website uses cookies to enhance the user experience. </CookieConsent>
            </Layout>
        </>
    );
}

export default App;


