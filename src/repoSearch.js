import React, {useState} from 'react'

function RepoSearch() {

    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);
    const [page_limit, setPageLimit] = useState(5);
    const [loading, setLoading] = useState(false);

    const searchRepos = (query) => {
        setLoading(true);
        fetch("https://api.github.com/search/repositories?sort=stars&q=" + query + "&page=" + page + "&per_page=" + page_limit)
            .then((data) => {
                data.json().then((resp)=>{
                    setLoading(false);
                    console.log("Response: ", resp);
                    setRepos(resp.items);
                })
            });
    }

    return (
        <div>
            <input type="text" onChange={ (event) => searchRepos(event.target.value) }/>
            <div>
                {
                    {loading} ?
                        "Carregando..."
                    :
                        {repos} ?
                            <div>
                                {
                                    repos.map((repo) => {
                                        <div>
                                            repo.name
                                        </div>
                                    })
                                }
                            </div>
                        : 
                            "Nenhum repositório encontrado"
                }
            </div> 
        </div>
    )
}
export default RepoSearch;