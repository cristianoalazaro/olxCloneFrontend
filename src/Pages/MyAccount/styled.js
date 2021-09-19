import styled from 'styled-components';

export const PageArea = styled.div`
    .datas {
        form {
            background-color: #FFF;
            border-radius: 3px;
            padding: 10px;
            box-shaddo: 0px 0px 3px #999;
            margin-top: 20px;

            .area {
                display: flex;
                align-items: center;
                padding:10px;
                max-width: 500px;

                .area-titulo {
                    width: 200px;
                    text-align: right;
                    padding-right: 20px;
                    font-weight: bold;
                    font-size: 14px;
                }

                .area-input {
                    flex: 1;

                    input {
                        width: 100%;
                        font-size: 14px;
                        padding: 5px;
                        border: 1px solid #DDD;
                        border-radius: 3px;
                        outline: 0;
                    }

                    .select {
                        width: 60px;
                        font-size: 14px;
                        padding: 5px;
                        border: 1px solid #DDD;
                        border-radius: 3px;
                        outline: 0;
                    }
                }
            }
            button {
                display: block;
                margin-left: 210px;
                background-color: #0089FF;
                border:0;
                outline: 0;
                padding: 5px 10px;
                border-radius: 4px;
                color: #FFF;
                font-size: 15px;
                cursor: pointer;

                &:hover {
                    background-color: #006FCE;
                }
            }

        }
    }

    .posts {
        h2 {
            text-align: center;
        }    
    }
`;