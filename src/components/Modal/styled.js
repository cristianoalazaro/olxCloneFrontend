import styled from 'styled-components';

export const PageArea = styled.div`
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);

    .main {
        position: fixed;
        margin:auto;
        width: 80%;
        heigth: auto;
        top:50%;
        left: 50%;
        background-color:#FFF;
        transform: translate(-50%, -50%);

        h1{
            text-align:center;
            color: brown;
        }

        .body {
            .buttons, .fields {
                display:block;
                text-align: center;
                margin: auto;
                padding:20px;

                input {
                    width: 300px;
                    font-size:14px;
                    padding:5px;
                }

                select {
                    width: 60px;
                    font-size: 14px;
                    padding: 5px;
                }

                button {
                    font-size: 14px;
                    padding: 5px 10px;
                    margin-right: 10px;
                }
            }
        }

    }
`;