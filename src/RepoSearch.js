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
        setPage(page-1);
    }

    
    return (
        <CContainer className='p-3'>
            <CRow className='my-3 align-items-start'>
                    <CCol md={6}>
                        <CFormInput type="text" onChange={(e) => setQuery(e.target.value)} />
                    </CCol>
                    <CCol md={1}>
                        <CButton type="button" color="secondary" style={{color:"white"}} onClick={() => {setPage(1); searchRepos();}}>Pesquisar</CButton>
                    </CCol>
                    <CCol>
                        Itens por página:
                        <CFormSelect className='d-inline mx-2' id='page-limit' value={page_limit} style={{width: "25%"}} onChange={(e) => setPageLimit(e.target.value)}
                        options={[
                            { label: "5", value: 5},
                            { label: "10", value: 10},
                            { label: "15", value: 15},
                            { label: "20", value: 20}
                        ]} />
                    </CCol>
                    <CCol md={2} className='ms-auto'>
                    {
                    page_count > 1 ?
                        <CPagination>
                            { page > 1 ? <CPaginationItem onClick={handleLastPage}> <FaAngleDoubleLeft/> </CPaginationItem> : "" }
                            { page > 1 ? <CPaginationItem> {page-1} </CPaginationItem> : "" }
                            <CPaginationItem active> {page} </CPaginationItem>
                            { page < page_count ? <CPaginationItem> {page+1} </CPaginationItem> : "" }
                            { page < page_count ? <CPaginationItem onClick={handleNextPage}> <FaAngleDoubleRight/> </CPaginationItem> : "" }
                        </CPagination>
                    :
                        ""
                    }
                    </CCol>
            </CRow>
            {
                loading ?
                    <Vortex color="#2f2f2f" />
                :
                    <CRow>
                        {repos ? repos.map((repo) => <RepoCard key={repo.id} repo={repo} />) : ""}
                    </CRow>
            }
        </CContainer>
    )
}

export default RepoSearch;