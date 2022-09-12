import { CButton, CCol, CContainer, CFormInput, CRow, CPagination, CPaginationItem, CFormSelect } from '@coreui/react';
import React, {useEffect, useState} from 'react'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { Vortex } from 'react-loader-spinner';
import RepoCard from './RepoCard';

function RepoSearch() {

    const [repos, setRepos] = useState([]);
    const [page_count, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const [page_limit, setPageLimit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");

    const searchRepos = () => {
        setLoading(true);
        fetch(`https://api.github.com/search/repositories?sort=stars&q=${query}&page=${page}&per_page=${page_limit}`)
            .then((data) => {
                data.json().then((resp)=>{
                    if(!resp.errors) {
                        setLoading(false);
                        console.log("Response: ", resp);
                        setPageCount(Math.floor(resp.total_count / page_limit));
                        setRepos(resp.items);
                    } else {
                        setLoading(false);
                        setPageCount(1);
                        setRepos(undefined);
                    }
                });
            });
    }
    
    useEffect(searchRepos, [page])

    const handleNextPage = () => {
        setPage(page+1);
    }

    const handleLastPage = () => {
        setPage(page