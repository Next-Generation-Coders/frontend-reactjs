import React, { useState, useEffect } from "react";
import SoccerLineup from "react-soccer-lineup";
import { nanoid } from "nanoid";
import {TeamLineupManager} from '@widgets/Coach/team_lineup';
import PageHeader from '@layout/PageHeader';

const TeamLineup = () => { 
  
  return (
    <>
        <PageHeader title="Team Linup" />
        <TeamLineupManager />
  
  </>
);
};


export default TeamLineup;
