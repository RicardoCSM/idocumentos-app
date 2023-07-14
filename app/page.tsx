import Container from './components/Container'
import DocumentForm from './components/form/DocumentForm'
import Image from 'next/image'
import DocumentList from './components/listing/DocumentsList'
import getCurrentUser from './actions/getCurrentUser'

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      {!currentUser ? (
        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 items-center w-full">
          <DocumentForm />
          <div className="hidden md:block ml-auto mr-auto">
            <Image 
              priority
              src="/images/documents.jpg"
              alt="Documents"
              className=""
              width="500"
              height="500"
            />
          </div>
        </div>
      ) : '' }
      {currentUser ? (
        <div className="pt-2">
          <DocumentList />
        </div>
      ) : ''}
    </Container>
  )
}
