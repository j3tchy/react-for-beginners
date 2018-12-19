import React, { Component } from "react";
import PropTypes from "prop-types";

class AddFishForm extends Component {
    // Attach to the dom using React.createRef
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    // addFish only requries a function
    static propTypes = {
        addFish: PropTypes.func
    };

    /**
     * Function is run onSubmit. When it is run, remove it's default behaviour as its a SPA.
     * Grab the values from the input values via 'ref'
     * Fish [Object] is created into a const called fish and passed through
     * to the addFish function.
     */
    createFish = (event) => {
        event.preventDefault();
        const fish = {
            name: this.nameRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value
        };

        this.props.addFish(fish);
        event.currentTarget.reset();
    };

    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input
                    name="name"
                    ref={this.nameRef}
                    type="text"
                    placeholder="Name"
                />
                <input
                    name="price"
                    ref={this.priceRef}
                    type="text"
                    placeholder="Price"
                />
                <select name="status" ref={this.statusRef}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea
                    name="desc"
                    ref={this.descRef}
                    type="text"
                    placeholder="Desc"
                />
                <input
                    name="image"
                    ref={this.imageRef}
                    type="text"
                    placeholder="Image"
                />
                <button type="submit">Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;
