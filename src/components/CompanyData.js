import '@jchristou/react-autocomplete-tags-input/dist-component/style.css';

import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import CompaniesDataService from '../services/CompaniesDataService';
import ReactAutoCompleteTagsInput from "@jchristou/react-autocomplete-tags-input";
import * as techOptions from '../data/techOptions.json';

const CompanyDataComponent = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { name } = useParams();

  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setCompanyData(CompaniesDataService.getCompanyData);
    };

    fetchData();
  }, []);

  const addItemToDevList = (item) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.dev.push(item);

    setCompanyData(newCompanyData);
  }

  const deleteItemFromDevList = (itemToRemove) => {
    let newCompanyData = Object.assign({}, companyData); 
    
    newCompanyData.tech.dev = newCompanyData.tech.dev.filter(item => item != itemToRemove);

    setCompanyData(newCompanyData);
  }

  const addItemToStorageList = (item) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.dataStorage.push(item);

    setCompanyData(newCompanyData);
  }

  const deleteItemFromStorageList = (itemToRemove) => {
    let newCompanyData = Object.assign({}, companyData); 
    
    newCompanyData.tech.dataStorage = newCompanyData.tech.dataStorage.filter(item => item != itemToRemove);

    setCompanyData(newCompanyData);
  }

  const addItemToToolsList = (item) => {
    let newCompanyData = Object.assign({}, companyData); 
    newCompanyData.tech.tools.push(item);

    setCompanyData(newCompanyData);
  }

  const deleteItemFromToolsList = (itemToRemove) => {
    let newCompanyData = Object.assign({}, companyData); 
    
    newCompanyData.tech.tools = newCompanyData.tech.tools.filter(item => item != itemToRemove);

    setCompanyData(newCompanyData);
  }

  const filterDevOptionsHandler = (input) => {
    let options = techOptions.dev;

    if(!input || input.length === 0){
      return options;
    }

    return options.filter(function(item) {
      return item.indexOf(input) >= 0;
    });
  }

  const filterStorageOptionsHandler = (input) => {
    let options = techOptions.dataStorage;

    if(!input || input.length === 0){
      return options;
    }

    return options.filter(function(item) {
      return item.indexOf(input) >= 0;
    });
  }
  
  const filterToolsOptionsHandler = (input) => {
    let options = techOptions.tools;

    if(!input || input.length === 0){
      return options;
    }

    return options.filter(function(item) {
      return item.indexOf(input) >= 0;
    });
  }

  if(companyData == null){
    return (
      <div>Loading.....</div>
    );
  }
  
  return (
    <div>
      <h2>Company Details: {companyData.name}</h2>
      <div>Name: {companyData.name}</div>
      <div>Id: {companyData.id}</div>
      <div>Jobs Page Url: {companyData.jobsPageUrl}</div>
      <div>
        <h3>Tech</h3>
        <label>Dev</label>
        <ReactAutoCompleteTagsInput items={companyData.tech.dev} addItemHandler={addItemToDevList} deleteItemHandler={deleteItemFromDevList} filterOptionsHandler={filterDevOptionsHandler}/>
        <label>Storage</label>
        <ReactAutoCompleteTagsInput items={companyData.tech.dataStorage} addItemHandler={addItemToStorageList} deleteItemHandler={deleteItemFromStorageList} filterOptionsHandler={filterStorageOptionsHandler}/>
        <label>Tools</label>
        <ReactAutoCompleteTagsInput items={companyData.tech.tools} addItemHandler={addItemToToolsList} deleteItemHandler={deleteItemFromToolsList} filterOptionsHandler={filterToolsOptionsHandler}/>
      </div>
    </div>
  );
}

export default CompanyDataComponent;