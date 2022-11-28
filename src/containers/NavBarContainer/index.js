import React, {useState} from "react";
import {connect, useDispatch} from "react-redux";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {getAuthUsername, getAuthUserSubredditTitles} from "../../redux/auth/reducer";
import {useNavigate} from "react-router-dom";
import {CREATE_POST_URL, CREATE_SUBREDDIT_URL, RESETOPASU_URL, SEARCH_URL, USER_PROFILE_URL} from "../../urls";
import {setSearchQuery} from "../../actions/Search";
import {getSubredditTitle} from "../../reducers/subreddit";
import {logout} from "../../redux";
import {SearchNavBarBtn} from "../../components/UserButton/UserButton.styles";
import {LinkContainer} from "react-router-bootstrap";
import alert from "../../redux/alert/actions";


const NavBarContainer = props => {
    const {userSubreddits} = props;
    const {authUsername, subredditTitle} = props;

    const [query, setQuery] = useState("")
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const redirectToCreatePost = () => {
        console.log(`XXXVT subredditTitle: ${subredditTitle}`)
        if (subredditTitle === "all" || subredditTitle === "popular" || subredditTitle === "home") {
            dispatch(alert(`You can't create a post in this page.`, "danger"));
        } else {
            return navigate(CREATE_POST_URL(subredditTitle));
        }
    }

    const redirectToCreateSubreddit = () => {

        return navigate(CREATE_SUBREDDIT_URL);
    }

    const redirectToResetopasu = () => {
        return navigate(RESETOPASU_URL);
    }

    const handleLogoutYo = () => {
        dispatch(logout())
        window.location.reload()
    }

    const redirectToUserProfile = () => {
        return navigate(USER_PROFILE_URL(props.authUsername));
    }
    const subscribedSubs = userSubreddits.map((title, idx) => (
        <LinkContainer to={"/r/" + title}>
            <NavDropdown.Item eventKey={idx}>{title}</NavDropdown.Item>
        </LinkContainer>
    ));

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update state to force render
        // An function that increment 👆🏻 the previous state like here
        // is better than directly setting `value + 1`
    }

    const forceUpdate = useForceUpdate();
    const handleChange = e => {
        setQuery(e.target.value)
    };
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setSearchQuery(query));
        } catch {
            forceUpdate();
        }
        setQuery("");
        navigate(SEARCH_URL);
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <LinkContainer to="/">
                    <Navbar.Brand>Programming Dictionary</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '250px'}}
                        navbarScroll
                    >

                        <NavDropdown title="Feed" id="navbarScrollingDropdown">
                            <LinkContainer to="/">
                                <NavDropdown.Item eventKey={3.1}>home</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/r/popular">
                                <NavDropdown.Item eventKey={3.2}>popular</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/r/all">
                                <NavDropdown.Item eventKey={3.3}>all</NavDropdown.Item>
                            </LinkContainer>

                            {userSubreddits.length > 0 && (
                                <NavDropdown.Divider/>
                            )}
                            {subscribedSubs}
                        </NavDropdown>

                        {authUsername ? (
                            <NavDropdown title={authUsername} id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={redirectToUserProfile} eventKey={4.1}>View
                                    profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={redirectToCreatePost} eventKey={4.2}>Create
                                    post</NavDropdown.Item>
                                <NavDropdown.Item onClick={redirectToCreateSubreddit} eventKey={4.3}>Create
                                    topic</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item onClick={redirectToResetopasu} eventKey={4.4}>Reset
                                    password</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogoutYo} eventKey={4.5}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/signup">
                                    <Nav.Link>Sign up</Nav.Link>
                                </LinkContainer>
                            </>

                        )}

                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            onChange={handleChange}
                            value={query}
                            aria-label="Search"
                        />
                        <SearchNavBarBtn type="submit" value={query} onClick={handleChange}
                                         variant="outline-success">Search</SearchNavBarBtn>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = state => ({
    userSubreddits: getAuthUserSubredditTitles(state),
    authUsername: getAuthUsername(state),
    subredditTitle: getSubredditTitle(state)
});

export default connect(
    mapStateToProps,
    null,
    null,
    {pure: false}
)(NavBarContainer);
