<template>
<el-row :gutter="10">
    <el-col :span="18">
        <div class="reports">
            <div class="reports-head">
                <h2>Reports</h2>
                    <el-input
                    v-model="input3"
                    placeholder="Search name"
                    class="input-with-select"
                    >
                        <template #append>
                            <el-button><el-icon><Search /></el-icon> </el-button>
                        </template>
                    </el-input>
            </div> <!-- end head -->
            <p>Room one</p>

            <div class="all-filter-items">
                <el-row :gutter="12">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="i in 3" :key="i">
                        <div class="filter-item">
                            <p class="title">Kitchen one</p>

                            <p class="count">Count</p>
                            <span class="count-num">120</span>

                            <p class="range-date">7 August ------- to 12 August</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-col>
    <el-col :span="6">
        <el-aside class="filter-wrapper">
           <h2>Filter</h2>
           <el-collapse accordion>
            <el-collapse-item title="Kitchen" name="1">
                <div>
                Consistent with real life: in line with the process and logic of real
                life, and comply with languages and habits that the users are used to;
                </div>
                <div>
                Consistent within interface: all elements should be consistent, such
                as: design style, icons and texts, position of elements, etc.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Room" name="2">
                <div>
                Operation feedback: enable the users to clearly perceive their
                operations by style updates and interactive effects;
                </div>
                <div>
                Visual feedback: reflect current state by updating or rearranging
                elements of the page.
                </div>
            </el-collapse-item>
            <el-collapse-item title="Indicator" name="3">
                <div>
                Simplify the process: keep operating process simple and intuitive;
                </div>
                <div>
                Definite and clear: enunciate your intentions clearly so that the
                users can quickly understand and make decisions;
                </div>
                <div>
                Easy to identify: the interface should be straightforward, which helps
                the users to identify and frees them from memorizing and recalling.
                </div>
            </el-collapse-item>
            </el-collapse>

            <div class="filter-date-picker">
                <div class="block">
                    <!-- <span class="demonstration">Creation date</span> -->
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="Creation date"
                        size="large"
                    />
                    <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="Serveded date"
                        size="large"
                    />
                </div>
            </div>

            <el-button type="text" class="filter-btn">Filter</el-button>
        </el-aside>
    </el-col>
</el-row>
</template>
<script>
import { Search } from '@element-plus/icons-vue'
export default {
    components:{
        Search
    },
}
</script>
<style lang="scss">
    .reports{
        padding: 20px;
        background-color: #f6f6f6;
        .reports-head{
            display: flex;
            align-items: center;
            justify-content: space-between;
            h2{
                background-color: #111;
                padding: 2px 5px;
                color:#fff;
                font-size: 16px;
                border-radius: 4px;
            }
            .el-input{
                width: 200px;
                
            }
            ::-webkit-input-placeholder { /* Edge */
                color: #111;
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #111;
            }

            ::placeholder {
                color: #111;
            }
            .el-input-group__append{
                right: -5px;
                top: -2px;
            }
            .el-button{
                background-color: #111 !important;
                color: #fff !important;
            }
        }

        .all-filter-items{
            .filter-item{
                padding: 20px 30px;
                background-color: #fff;
                box-shadow: 0 2px 4px 0 rgba(0,0,0,.12);
                .title{
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                p{
                    margin: 0;
                    font-weight: bold;
                }
                .count{
                    font-size: 12px;
                }
                .count-num{
                    font-weight: bold;
                    font-size: 18px;
                    background-color: gray;
                    line-height: 0;
                    margin-bottom: 20px;
                }
                .range-date{
                    margin-top: 20px;
                }
            }
        }
    }
    .filter-wrapper{
        margin-top: 0;
        padding: 20px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12);
        .filter-date-picker{
            .el-input__inner{
                border: 0;
                padding: 0 !important;
            }
            .el-input{
                --el-input-icon-color: #111;
                width: 97%;
            }
            .el-input__prefix{
                right:0;
                left:auto;
            }
            ::-webkit-input-placeholder { /* Edge */
                color: #111;
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #111;
            }

            ::placeholder {
                color: #111;
            }
        }
        .filter-btn{
            margin: 10px 15px;
            width: 90%;
            height: 40px;
        }
    }

    @include rtl() {
        .filter-wrapper{
            .el-collapse-item__arrow{
                margin: 0 auto 0 0;
                transform: rotate(180deg);
                &.is-active{
                    transform: rotate(90deg);
                }
            }
             .el-input__prefix{
                right:auto;
                left:0;
             }
        }
    }
</style>