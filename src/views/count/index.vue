<template>
  <div class="count-container">
    <el-date-picker
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panel
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    />
    <el-button
      type="primary"
      style="
        width: 200px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        margin-bottom: 10px;
      "
      @click="getList"
    >
      查询
    </el-button>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="地区"
        width="65"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.province }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="酒店数量">
        <template slot-scope="scope">
          <span>{{ scope.row.hotelCount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="设备数量">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceCount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="转换数量">
        <template slot-scope="scope">
          <span>{{ scope.row.converCount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="转换率">
        <template slot-scope="scope">
          <span>{{ scope.row.converPer }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="日均使用次数">
        <template slot-scope="scope">
          <span>{{ scope.row.recordPer }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="日均使用时长">
        <template slot-scope="scope">
          <span>{{ scope.row.recordCount }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="详情">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchAllCountList } from '@/api/article'
import moment from 'moment'
export default {
  data() {
    return {
      list: null,
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() - 3600 * 1000 * 24)
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      createdTimes: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      const start = moment(this.value2[0])
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
      const end = moment(this.value2[1])
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss')
      this.listQuery.start = start
      this.listQuery.end = end
      fetchAllCountList(this.listQuery).then((response) => {
        this.list = response.rows
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>
