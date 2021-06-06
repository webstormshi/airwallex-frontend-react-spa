import React, { useState, useMemo } from 'react';
import { Button, Modal, Input, Form } from "antd";
import { postRegister } from '../service';
import "./index.css";

function Content() {

    const [form, setForm] = useState({
        name: '',
        email: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(undefined);

    const toggleModal = (status) => setShowModal(status);

    const resetModal = () => {
        toggleModal(false);
        setResult(undefined);
    }

    const handleChange = (value) => {
        if(value.name || value.email) {
            setForm({
                ...form,
                ...value
            });
        }
    }

    const confirmValidator = (rule, value, callback) => {
        if(value !== form.email) {
            callback("Two input email must be consistent.");
        }
        callback();
    }

    const handleFinished = () => {
        setLoading(true);
        postRegister(form).then(res => {
            setLoading(false);
            if(res.status === 200) {
                setResult({ code: 0 });
            } else {
                throw new Error("Error messge from server here");
            }
        }).catch(err => {
            setTimeout(() => {
                setLoading(false);
                setResult({
                    code: -1,
                    message: "Error messge from server here"
                });
            }, 1500);
        });
    }

    const renderFormContent = useMemo(() => {
        if(!result || result.code === -1) {
            return (
                <Form
                    defaultValue={form}
                    onValuesChange={handleChange}
                    onFinish={handleFinished}
                >
                    <div className="content-modal__title">
                        Request an invite
                    </div>
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: "Please input your full name!" },
                            { min: 3, message: "Please input 3 string at least!" }
                        ]}
                    >
                        <Input placeholder="full name" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { pattern:  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                              message: "email format is incorrect!"
                            }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="confirmEmail"
                        rules={[
                            { required: true, message: "Please input your email!" },
                            { validator: confirmValidator }
                        ]}
                    >
                        <Input placeholder="Confirm email" />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            block={true} 
                            htmlType="submit" 
                            loading={loading}
                            loadin
                        >
                            {loading ? "Sending, please waiting..." : "Send"}
                        </Button>
                    </Form.Item>
                    <div className="content-container__error">{result && result.message}</div>
                </Form>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="content-modal__title">
                        All done!
                    </div>
                    <div className="content-modal__desc">
                        You will be one of the first to experience <br />
                        Broccoli & Co. when we launch.
                    </div>
                    <Button type="outlined" block={true} onClick={resetModal}>Ok</Button>
                </React.Fragment>
            );
        }
    }, [result, loading, form]);

    return (
        <div className="content">
            <div className="content-container">
                <h1 className="content-container__title">A better way to enjoy every day.</h1>
                <p className="content-container__desc">Be the first to know when we launch.</p>
                <Button type="outlined" onClick={toggleModal.bind(null, true)}>Request an invite</Button>
            </div>

            {/* register and login modal */}
            <Modal
                className="content-modal"
                visible={showModal}
                centered={true}
                footer={null}
                width={400}
                closable={false}
                onCancel={resetModal}
            >
                {renderFormContent}
            </Modal>
        </div>
    );
}

export default Content;