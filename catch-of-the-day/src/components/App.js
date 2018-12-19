import React, { Component } from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";

import base from "../base";

import sampleFishes from "../sample-fishes";

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };

    static propTypes = {
        match: PropTypes.object
    };

    componentDidMount() {
        const { params } = this.props.match;
        // Sets the DB with the sample data
        const localStorageRef = localStorage.getItem(params.storeId);

        if (localStorageRef) {
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    componentDidUpdate() {
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish = (fish) => {
        // Create copy of the object.
        const fishes = { ...this.state.fishes };

        fishes[`fish${Date.now()}`] = fish;

        this.setState({
            fishes
        });
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    };

    addToOrder = (key) => {
        const order = { ...this.state.order };

        order[key] = order[key] + 1 || 1;

        this.setState({
            order
        });
    };

    // Want to remove the fish from the order list not the actual item from the menu
    removeFromOrder = (key) => {
        const order = { ...this.state.order };

        delete order[key];

        this.setState({
            order
        });
    };

    updateFish = (key, updatedFish) => {
        // Create a clone of the object
        const fishes = { ...this.state.fishes };
        // Add a new key => value to the object
        fishes[key] = updatedFish;
        // set the new state
        this.setState({
            fishes
        });
    };

    deleteFish = (key) => {
        const fishes = { ...this.state.fishes };
        fishes[key] = null;
        this.setState({
            fishes
        });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map((key) => {
                            return (
                                <Fish
                                    addToOrder={this.addToOrder}
                                    key={key}
                                    index={key}
                                    details={this.state.fishes[key]}
                                />
                            );
                        })}
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    orders={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    updateFish={this.updateFish}
                    addFish={this.addFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                />
            </div>
        );
    }
}

export default App;
