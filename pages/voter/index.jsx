import React from "react";

const Voter = () => {
    return <div>Voter</div>;
};

Voter.getLayout = (page) => {
    return <>
        {page}
    </>
}
Voter.voter = true
export default Voter;