package cc.mrbird.febs.cos.service;

import cc.mrbird.febs.cos.entity.ScenicOrder;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import org.apache.ibatis.annotations.Param;

import java.util.LinkedHashMap;
import java.util.List;

/**
 * @author FanK
 */
public interface IScenicOrderService extends IService<ScenicOrder> {

    /**
     * 分页查询景点订单
     *
     * @param page
     * @param scenicOrder
     * @return
     */
    IPage<LinkedHashMap<String, Object>> scenicInfoByPage(Page page, ScenicOrder scenicOrder);

    /**
     * 获取用户订单信息
     *
     * @param userId 用户ID
     * @return 结果
     */
    List<LinkedHashMap<String, Object>> getScenicOrderByUserId(Integer userId);

    /**
     * 查询订单详情
     *
     * @param orderId 订单ID
     * @return 结果
     */
    LinkedHashMap<String, Object> queryScenicOrderDetail(Integer orderId);

    /**
     * 查询本月景点流量排行榜
     *
     * @param date 统计日期
     * @return 结果
     */
    List<LinkedHashMap<String, Object>> queryScenicTop(String date);

    /**
     * 年统计订单及收益
     *
     * @param date 年份
     * @return 结果
     */
    LinkedHashMap<String, Object> selectStoreStatisticsByYear(String date);

    /**
     * 月统计订单及收益
     *
     * @param date 日期
     * @return 结果
     */
    LinkedHashMap<String, Object> selectStoreStatisticsByMonth(String date);

    /**
     * 管理员获取主页统计数据
     *
     * @return 结果
     */
    LinkedHashMap<String, Object> homeDataByAdmin();
}
