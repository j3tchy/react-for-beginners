import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import Login from "../components/Login";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import base, { firebaseApp } from "../base";

class Inventory extends Component {
    static propTypes = {
        fishes: PropTypes.shape({
            fish: PropTypes.shape({
                name: PropTypes.string.isRequired,
                desc: PropTypes.string.isRequired,
                status: PropTypes.string.isRequired,
                image: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired
            })
        }),
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    // Login state.
    state = {
        uid: null,
        owner: null
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async (authData) => {
        // Fetch database from firebase
        const store = await base.fetch(this.props.storeId, {
            context: this
        });

        // If there is no store owner, post to the following DB -> UID
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }

        // Set state
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.id
        });
    };

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();

        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    loggingOut = async () => {
        console.log("Logging out");
        await firebase.auth.signOut();
        this.setState({ uid: null });
    };

    render() {
        const logout = <button onClick={this.logout}>Logout</button>;
        //  Check user is logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        // Check if they are owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <span>You are not the owner</span>
                    {logout}
                </div>
            );
        }

        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {/* Add the updateFish props upstream to the App.js */}
                {Object.keys(this.props.fishes).map((key) => {
                    return (
                        <EditFishForm
                            updateFish={this.props.updateFish}
                            deleteFish={this.props.deleteFish}
                            index={key}
                            key={key}
                            fish={this.props.fishes[key]}
                        />
                    );
                })}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes
                </button>
            </div>
        );
    }
}

export default Inventory;
