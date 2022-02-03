import React, { Component } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
class Categoryflag extends Component {
    state = {
        selectedValue: ""
    };
    onSelect = (selectList, selectItem) => {
        this.props.onOptionChange(selectList)
    }
    onRemove = (selectList, selectItem) => {
        this.props.onOptionChange(selectList)
    }
    render() {
        const { topicCB } = this.props;
        return (
            <div>
                <Multiselect
                    placeholder="Select post category"
                    singleSelect={true}
                    options={topicCB} // Options to display in the dropdown
                    showCheckbox={true} // Preselected value to persist in dropdown
                    onSelect={this.onSelect} // Function will trigger on select event
                    onRemove={this.onRemove} // Function will trigger on remove event
                    displayValue="topic" // Property name to display in the dropdown options
                />

            </div>
        );
    }
}

export default Categoryflag;