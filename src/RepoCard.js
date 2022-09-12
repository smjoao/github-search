import { FaCode, FaRegStar, FaCodeBranch } from 'react-icons/fa';
import { CAvatar, CCard, CCardBody, CCardSubtitle, CCardText, CCardTitle } from '@coreui/react'

const RepoCard = ({ repo }) => (
    
    <CCard className='my-2'>
        <CCardBody>
            <a href={repo.html_url} className='text-decoration-none'>
                <CCardTitle className='align-self-start fs-1'>{repo.name}</CCardTitle>
            </a>
            <CCardSubtitle className='text-medium-emphasis mb-3'>
                <CAvatar src={repo.owner.avatar_url} size="sm" color="secondary"/> {repo.owner.login}
            </CCardSubtitle>
            <CCardText>{repo.description}</CCardText>
            <ul className='footer-list'>
                <li> <FaCode /> {repo.language}</li>
                <li> <FaRegStar /> {repo.stargazers_count}</li>
                <li> <FaCodeBranch /> {repo.forks_count}</li>
                <li> Última Atualização: {(new Date(repo.updated_at)).toLocaleDateString()}</li>
            </ul>
        </CCardBody>
    </CCard>
);

export default RepoCard;