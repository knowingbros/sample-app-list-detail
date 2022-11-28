import React, {useState} from "react";
import PropTypes from "prop-types";
import {Navbar} from "react-bootstrap";
import {SEARCH_URL} from "../../urls";
import "./styles.css";
import {useNavigate} from "react-router-dom";
import {NavSearchForm, SearchInp} from "../Nbob/Nbob.styles";

function SearchBar(props) {

    const [query, setQuery] = useState("")
    let navigate = useNavigate();

    const handleChange = e => {
        setQuery(e.target.value)
    };

    function useForceUpdate() {
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update state to force render
        // An function that increment 👆🏻 the previous state like here
        // is better than directly setting `value + 1`
    }

    const forceUpdate = useForceUpdate();
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            await props.handleSearchRequest(query);
        } catch {
            forceUpdate();
        }
        setQuery("");
        navigate(SEARCH_URL);
    }


    return (
        <Navbar className="navbar-search">
            <NavSearchForm className="ml-auto form-search-bar" autoComplete="off" onSubmit={handleSearchSubmit}>
                <SearchInp
                    id="search-bar-input"
                    type="text"
                    placeholder="Search..."
                    name="search"
                    onChange={handleChange}
                    value={query}
                />
            </NavSearchForm>
        </Navbar>
    );
}

SearchBar.propTypes = {
    handleSearchRequest: PropTypes.func
};

export default SearchBar;
