import Container from './components/Container'
import Heading from './components/Heading'
import DocumentForm from './components/form/DocumentForm'
import Input from './components/inputs/Input'
import Image from 'next/image'

export default function Home() {
  return (
    <Container>
      <div className="pt-5 grid grid-cols-1 md:grid-cols-2 w-full items-center justify-center">
        <DocumentForm />
        <div className="hidden md:block">
          <Image 
            src="/images/documents.jpg"
            alt="Documents"
            className=""
            width="500"
            height="500"
          />
        </div>
      </div>

    </Container>
  )
}
