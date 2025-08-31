import { Card,Form,Input,Button, Select,Collapse, type CollapseProps, Row, Col,type FormProps, message } from "antd"
import { useState, useEffect,useRef } from "react"
import {getAllSchemas, addRecord} from '../pages/api/apis'
import { getStructuralKey,getAuxiliary,getObjectAttributes } from "../pages/api/utils.tsx"
import {PlusOutlined} from '@ant-design/icons'
import { useLocation } from "react-router"
import { useDataContext } from "../pages/RecordInfo.tsx"


function Ladd() {
    const [form] = Form.useForm()
    const {Option} = Select;
    const location = useLocation()
    const param = location.state
    const {refreshData} = useDataContext()

    const [messageApi, contextHolder] = message.useMessage()
    const [prefix, setPrefix] = useState()
    const [schema, setSchema] = useState({schemas: {}})
    const [struct, setStruct] = useState<string[]>()
    const [auxiliaryKey, setAuxiliaryKey] = useState<string[]>([])

    const [selectedStructural, setSelectedStructural] = useState<string>('')
    //const [selectedAuxiliary, setSelectedAuxiliary] = useState<string[]>([])
    
    const selectedAuxiliary = useRef(new Map<string,string>())

    const [showAuxiliarySelect, setShowAuxiliarySelect] = useState(false)
    const [auxCount, setAuxCount] = useState(1)
    
    const [,forceRender] = useState({})

    const triggerRender = ()=>{
        forceRender({})
    }

    const retrieveSchemas = async() => {
        try {
            const s = await getAllSchemas()
            //console.log("getted data: " , s)
            setSchema({schemas: s.data.schemas})
        }catch(error) {
            console.log("get schema error: ", error)
        }
    }

    // update corresponding key base on schems
    useEffect( () => {
            const tmp = getStructuralKey(schema)
            setStruct(tmp)
            //console.log("struct: ", struct)
            const tm = getAuxiliary(schema)
            setAuxiliaryKey(tm)
            //console.log("auxiliary key: ", auxiliaryKey)
    }, [schema])
    
    useEffect(()=>{
        //setInterval(retrieveSchemas, 1000*60)
        retrieveSchemas()
        
        console.log("parame for add:  ", param)
        if(param) {
            const data = param.DN.split(",").reverse().join(",")
            console.log("parame for add:  ", param,", prefix: ", data)
            setPrefix(data)
        }
        
    }, [])

    useEffect(() => {
        if (schema.schemas === null )
            //console.log("loading data1")
            retrieveSchemas()
    }, [location.pathname])

    const onStructObjSelect = (value: string ) => {
        //console.log("struct select val: ", value)
        //const attrs = getObjectAttributes(schema, value)
        setSelectedStructural(value)

        setShowAuxiliarySelect(true)
        triggerRender()
    }

    const onAuxiliarySelect = (key:string, value: string) => {
        //console.log("select auxiliary key :",key, ", value is: ", value)
        selectedAuxiliary.current.set(key, value)
        triggerRender()
    }

    const showAuxiliarySelectItem = ()=>{
        if (!showAuxiliarySelect) {
            return (<></>)
        }
        
        const vals = Array.from(selectedAuxiliary.current.keys()).map((key) => (
            <div key={key}>
            <Form.Item
                label="ObjectClass(Auxiliary)"
                name={key}
                key={key}
            >
                <Select
                placeholder="select objectClass for record"
                onSelect={(value) => {onAuxiliarySelect(key, value)}}
                value={selectedAuxiliary.current.get(key)}
                >
                {
                    auxiliaryKey?.map((str, index) => (
                    <Option key={index} value={str}>{str}</Option>
                    ))
                }
                </Select>
            </Form.Item>
            <Row>
                <Col span={16} offset={8}>
                    <Collapse items={selectedAuxiliary.current.get(key) !== "" ? renderAttributeInputs(selectedAuxiliary.current.get(key)) : undefined} 
                    style={{width:"100%",marginTop: "2px"}}></Collapse>
                </Col>
            </Row>
            </div>
        ))
        
        return vals
    }

    const addAuxiliarySelect = () => {
        const idx = `ObjectClass${auxCount}`
        selectedAuxiliary.current.set(idx,"")
        setAuxCount(auxCount+1)
        triggerRender()
    }

    const formOnFinish:FormProps["onFinish"] = async (values) => {
        console.log("form onFinish values: ", values)
        if (values.DN === undefined || values.DN==="") {
            messageApi.warning("please input valid DN")
            return 
        }
        let dn = prefix + "," + values.DN
        dn = dn.split(",").reverse().join(",")
        delete values["DN"]
        const obj:any = {}
        const obclass:string[] = []
        Object.entries(values).forEach(val => {
            if(val[0].toLocaleLowerCase().startsWith("objectclass")) {
                obclass.push(val[1] as string)
                return
            }else if (val[1] !== undefined) {
                obj[val[0]] = val[1]
            }
        })
        obj["objectClass"] = obclass.join(",")
        obj["DN"] = dn
        console.log("obj === ", obj)

        try {
            const data = await addRecord(JSON.stringify(obj))
            if(data.status === 200 || data.status === 201 ){
                messageApi.success("record add success")
                refreshData()
            }
        }catch (err) {
            console.log("add record error: ", err)
            messageApi.error("add record fail")
        }
    }

    const formOnFinishFail:FormProps["onFinishFailed"] = (errInfo) => {
        console.log("on finish error: ", errInfo)
    }

    const renderAttributeInputs = (objclass: string|undefined) => {
        if (objclass === "" || objclass === undefined) {
            return
        }
        let attrs: string[] = getObjectAttributes(schema, objclass).must || []
        const child = attrs.map((attr) => (
            <Form.Item
                key={attr}
                label={attr}
                name={attr}
                style={{marginBottom: 12}}
                >
                    <Input placeholder={`enter ${attr}`} />
                </Form.Item>
        ));

        let mayattrs: string[] = getObjectAttributes(schema, objclass).may || []
        const maychild = mayattrs.map((attr) => (
            <Form.Item
                key={attr}
                label={attr}
                name={attr}
                style={{marginBottom: 12}}
                >
                    <Input placeholder={`enter ${attr}`} />
                </Form.Item>
        ));

        const items: CollapseProps["items"] = [
            {
                key: "1",
                label: "Must",
                children: <>{child}</>

            },
            {
                key: "2",
                label: "May",
                children: <>{maychild}</>
            }
        ]

        return items
    }

    return (
        <>
        {contextHolder}
            <Card title="DN info" style={{width:"60%", height: "fit-content",marginTop:"1%"}}>
                    <Form
                    name="basic"
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: "80%"}}
                    autoComplete="off"
                    onFinish={formOnFinish}
                    onFinishFailed={formOnFinishFail}
                    //initialValues={dnInfo}
                    >
                    <div style={{width: "100%"}}>
                        <Form.Item
                                label="DN"
                                name="DN"
                            >
                                <Input addonBefore={prefix}/>
                        </Form.Item>
                        <Form.Item
                                label="ObjectClass(structural)"
                                name="objectClass"
                            >
                                <Select
                                placeholder="select objectClass for record"
                                onSelect={onStructObjSelect}
                                >
                                {
                                  struct?.map((str, index) => (
                                    <Option key={index} value={str}>{str}</Option>
                                  ))
                                }
                                </Select>
                        </Form.Item>
                        {
                        <Row>
                            <Col span={16} offset={8}>
                                <Collapse items={renderAttributeInputs(selectedStructural)} 
                                style={{width:"100%",marginTop: "2px"}}></Collapse>
                            </Col>
                        </Row>
                        }
                        {
                         showAuxiliarySelectItem()
                        }
                        <Row>
                            <Col span={16} offset={8}>
                                <Button onClick={addAuxiliarySelect} style={{width:"100%",marginTop:"16px"}} icon={<PlusOutlined />}/>
                            </Col>
                            </Row>
                       <Form.Item label={null} style={{marginTop: "16px"}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                        </div>
                    </Form>
            </Card>  
        </>
    )
}


export {Ladd}
