import React, { useEffect } from 'react';
import styles from "./Team.module.css";

const Team = () => {

    const getUser =async ()=>{

        const res = await fetch('https://api.github.com/users');
        const response = await res.json();

        console.log(response);

    }

    useEffect(()=>{
        getUser();
    },[])

    return (
        <div>
            hello world
        </div>
    );
};

export default Team;