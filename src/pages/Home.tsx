import { Col, Row, Table, Form, Button } from 'react-bootstrap';
import { TableLine } from "../components/TableLine"
import { useState } from "react"
import { ProductDetailsDto } from "../dto/ProductDetailsDto"
import axios from 'axios';
import { BaseUrl } from '../http/baseUrl';
import { EndPoint } from '../http/endpoint';
import { Blocks } from 'react-loader-spinner';
import { InputTypeFIle } from '../components/InputTypeFIle';
import { UploadResponseDto } from '../dto/UploadResponseDto';

export const Home = () => {
    const [products, setProduct] = useState<ProductDetailsDto[]>([])
    const [search, setSearch ] = useState("");
    const [isLoad, setIsLoad ] = useState(false);
    const [isCalled, setIsCalled ] = useState(false);
    const [ uplaodFile, setUplaodFile] = useState<FileList|null>(null)
    const [ files, setFiles ] = useState<UploadResponseDto>({status: ""}) 
    

    const handleSearchChange = (e: any) => setSearch(e.target.value);

    const makeSearch = () => {
        setIsLoad(true)
        axios.get(BaseUrl.dev+EndPoint.getProductByCustomerId+search)
        .then(response => {
            setProduct(response.data)
        })
        .finally(() => {
            setIsLoad(false)
            setIsCalled(true)
        })
    }
    const submit = (e: any) => {
        e.preventDefault()
        const formData = new FormData();
        if(uplaodFile){
            formData.append("file",uplaodFile[0])
           axios({
            method: "post",
            url: BaseUrl.dev+EndPoint.uploadProductsFile,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((response) => {
                console.log(response);
            })
        }
        
    }

    

    return <>
        <Row className='mt-5 mb-4'>
            <Col>
                <h2>SEARCH CUSTOMERS PURCHASE</h2>
            </Col>
            <Col>
                <form className='row' onSubmit={submit}>
                    <Col>
                        <InputTypeFIle for="uplaod" fieldName="" handler={setUplaodFile} />
                    </Col>
                    <Col>
                        <Button type='submit' variant="outline-primary" disabled={ uplaodFile?.length == 0} onClick={makeSearch}>
                            UPLOAD
                        </Button>
                    </Col>
                </form>
            </Col>
        </Row>
        <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" onChange={handleSearchChange} placeholder="ENTER CUSTOMER REF" />
            </Form.Group>
            </Col>
            <Col>
                <Button variant="outline-primary" disabled={search.length == 0} onClick={makeSearch}>SEARCH</Button>
            </Col>
        </Row>
       <Row>
        <Col>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID PRODUCT</th>
                    <th>PRODUCT NAME</th>
                    <th>PRODUCT QUANTITY</th>
                    <th>PRODUCT PRICE</th>
                    </tr>
                </thead>
                {products.length > 0 && <tbody>
                    {products.map(product => (<TableLine key={product.idProduct} data={product} />))}
                </tbody>}
            </Table>
                { products.length == 0 && isLoad == false ? 
                (isCalled ?  <h3 className='w-100 text-center'>IS EMPTY</h3> : <h3 className='w-100 text-center'>SEARCH RESULT</h3>)
                 : 
                <div className='w-100 text-center'>
                    <Blocks
                        height="40"
                        width="40"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperClass="blocks-wrapper"
                        visible={isLoad}
                    />
                </div>
                }
            </Col>
       </Row>
    </>
}