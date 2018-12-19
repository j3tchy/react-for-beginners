import React, { Component } from "react";
import PropTypes from "prop-types";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

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
    render() {
        return (
            <div className="inventory">
                <h2>Inventory</h2>
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
